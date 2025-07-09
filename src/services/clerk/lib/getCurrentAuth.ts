import { findUserById } from '@/features/users/db/users'
import { auth } from '@clerk/nextjs/server'
import { boolean } from 'drizzle-orm/gel-core'

/**
 * Get the current auth user id from clerk.
 * If `options.allData` is true, it will also fetch user data from the database.
 * @param options - Optional config to get full user data.
 */
export const getCurrentUser = async (options: { allData?: boolean } = {}) => {
    const { userId } = await auth()

    return {
        userId,
        user: options.allData && userId != null ? await findUserById(userId) : undefined
    }
}
