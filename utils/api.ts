/**
 * Utility function to make API requests with error handling
 * @param url The URL to fetch data from
 * @returns The parsed JSON response
 * @throws Error if the request fails
 */
export async function makeRequest(url: string) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error)
        throw error
    }
}

/**
 * Formats race data by processing FastestLap information
 * @param races Array of race data from API
 * @returns Processed race data
 */
export function processRaceData(races: any[]) {
    if (!races || !Array.isArray(races)) return []

    const processedRaces = [...races].reverse()

    for (let i = 0; i < processedRaces.length; i++) {
        for (let j = 0; j < processedRaces[i].Results?.length || 0; j++) {
            if (processedRaces[i].Results[j].FastestLap === undefined) {
                processedRaces[i].Results[j].FastestLap = "-"
            } else {
                processedRaces[i].Results[j].FastestLap =
                    processedRaces[i].Results[j].FastestLap.Time?.time || "-"
            }
        }
    }

    return processedRaces
}

/**
 * Finds a driver ID from a driver code
 * @param drivers Array of driver data
 * @param driverCode The three-letter driver code
 * @returns The driver ID or null if not found
 */
export function findDriverIdFromCode(drivers: any[], driverCode: string) {
    if (!drivers || !Array.isArray(drivers)) return null

    for (const driver of drivers) {
        if (driver.code === driverCode) {
            return driver.driverId
        }
    }

    return null
}