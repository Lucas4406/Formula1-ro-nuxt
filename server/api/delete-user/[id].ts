import { defineEventHandler, getRouterParam, H3Event } from 'h3'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event: H3Event) => {
    const userId = getRouterParam(event, 'id')
    // Asigură-te că aceste variabile sunt setate în `.env`
    const supabaseUrl = process.env.SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Creează clientul cu cheia de service role
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    if (!userId) {
        return { success: false, message: 'User ID lipsă.' }
    }

    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: 'Utilizator șters cu succes.' }
})
