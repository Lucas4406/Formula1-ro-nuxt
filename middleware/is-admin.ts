export default defineNuxtRouteMiddleware(async () => {
    const user = useSupabaseUser()
    const config = useRuntimeConfig()
    // Verificare UID
    if (user.value?.id !== config.public.VITE_ADMIN_UID) {
        return navigateTo('/')
    }
})