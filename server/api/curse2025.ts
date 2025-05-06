export default defineEventHandler(async (event) => {
    const cache = useStorage() // din nuxt
    const key = 'curse2025'

    const cached = await cache.getItem(key)
    if (cached) return cached

    const res = await $fetch('https://api.jolpi.ca/ergast/f1/2025/races.json?limit=100')
    const races = res?.MRData?.RaceTable?.Races || []

    await cache.setItem(key, races, { ttl: 60 * 60 }) // 1 oră
    return races
})
