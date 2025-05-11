import { defineEventHandler, getRouterParam } from 'h3'
import { makeRequest, processRaceData, findDriverIdFromCode } from '~/utils/api'

export default defineEventHandler(async (event) => {
    try {
        // Get driver code from route parameter
        const driverCode = getRouterParam(event, 'id')

        if (!driverCode) {
            throw createError({
                statusCode: 400,
                message: 'Driver code is required'
            })
        }

        // Step 1: Get the driver ID from the code
        const driversData = await makeRequest('https://api.jolpi.ca/ergast/f1/2025/drivers.json')
        const drivers = driversData.MRData?.DriverTable?.Drivers || []

        const driverId = findDriverIdFromCode(drivers, driverCode)

        if (!driverId) {
            throw createError({
                statusCode: 404,
                message: `Driver with code ${driverCode} not found`
            })
        }

        // Step 2: Get driver's race results
        const resultsData = await makeRequest(
            `https://api.jolpi.ca/ergast/f1/2025/drivers/${driverId}/results.json?limit=100`
        )

        const races = resultsData.MRData?.RaceTable?.Races || []
        const season = resultsData.MRData?.RaceTable?.season || ''

        // Step 3: Process race data
        const processedRaces = processRaceData(races)

        // Step 4: Get driver info from MongoDB
        const config = useRuntimeConfig()

        const driversMongoData = await makeRequest(`${config.public.apiBaseUrl}/mongo/piloti?order=asc`)

        let driverInfo = null
        for (const driver of driversMongoData) {
            if (driver.alDoileaNume.slice(0, 3).toUpperCase() === driverCode) {
                driverInfo = {
                    fullName: `${driver.primulNume} ${driver.alDoileaNume}`,
                    firstName: driver.primulNume,
                    lastName: driver.alDoileaNume,
                    team: driver.echipa,
                    position: driver.pozitie,
                    points: driver.puncte,
                    color: driver.culoare
                }
                break
            }
        }

        if (!driverInfo) {
            throw createError({
                statusCode: 404,
                message: `Driver info not found in MongoDB for code ${driverCode}`
            })
        }

        // Return complete data
        return {
            driverInfo,
            season,
            races: processedRaces
        }
    } catch (error) {
        console.error('Error fetching driver data:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch driver data'
        })
    }
})