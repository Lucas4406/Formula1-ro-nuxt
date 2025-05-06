export default defineEventHandler(async () => {
    const cache = useStorage()
    const key = 'runda-actuala'

    const cached = await cache.getItem(key)
    if (cached) return cached

    const res = await $fetch(`${process.env.VITE_API_LINK}/get-next`)
    await cache.setItem(key, res, { ttl: 60 * 10 }) // 10 minute
    return res
})
