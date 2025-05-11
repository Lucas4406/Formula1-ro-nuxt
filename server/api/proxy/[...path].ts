export default defineEventHandler(async (event) => {
    // Get path from context params, ensuring it's properly handled
    const path = event.context.params?.path || ''
    const resolvedPath = Array.isArray(path) ? path.join('/') : path

    const query = getQuery(event)
    const method = getMethod(event)
    const headers = getRequestHeaders(event)
    const config = useRuntimeConfig()

    // Make sure apiBaseUrl is defined in your runtimeConfig
    if (!config.public.apiBaseUrl) {
        console.error('[Proxy Error] Missing apiBaseUrl in runtimeConfig')
        throw createError({
            statusCode: 500,
            statusMessage: 'Server configuration error',
        })
    }

    // Construct the full URL correctly - remove trailing slash if needed
    const baseUrl = config.public.apiBaseUrl.endsWith('/')
        ? config.public.apiBaseUrl.slice(0, -1)
        : config.public.apiBaseUrl

    const url = resolvedPath ? `${baseUrl}/${resolvedPath}` : baseUrl

    console.log(`[Proxy Request] ${method} -> ${url}`)

    // Prepare fetch options
    const options = {
        method,
        params: query, // Use params instead of query for $fetch
        headers: {
            'Content-Type': headers['content-type'] || 'application/json',
            // Pass through authorization if present
            ...headers.authorization ? { 'Authorization': headers.authorization } : {},
        }
    }

    // Add body for appropriate HTTP methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
        try {
            options.body = await readBody(event)
        } catch (e) {
            console.warn('[Proxy Warning] Could not read request body:', e)
        }
    }

    try {
        // Make the request and return the response
        const response = await $fetch(url, options)
        console.log(`[Proxy Success] ${method} -> ${url}`)
        return response
    } catch (error) {
        console.error(`[Proxy Error] ${method} -> ${url}`, error)

        // Handle fetch errors with appropriate status codes
        throw createError({
            statusCode: error.response?.status || 500,
            statusMessage: error.message || 'Proxy error',
            data: error.response?._data
        })
    }
})