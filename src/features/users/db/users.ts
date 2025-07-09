import { eq } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { UserTable } from '@/drizzle/schema'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { getUserIdCacheTag, revalidateUserCache } from '@/features/users/cache/users'

export const findUserById = async (userId: string) => {
    'use cache'
    cacheTag(getUserIdCacheTag(userId))

    return await db.query.UserTable.findFirst({
        where: eq(UserTable.id, userId)
    })
}

export const insertUser = async (user: typeof UserTable.$inferInsert) => {
    // Avoid uncommon error: Multiple webhooks triggered for a same user
    await db.insert(UserTable).values(user).onConflictDoNothing()

    revalidateUserCache(user.id)
}

export async function updateUser(userId: string, user: Partial<typeof UserTable.$inferInsert>) {
    await db.update(UserTable).set(user).where(eq(UserTable.id, userId))

    revalidateUserCache(userId)
}

export async function deleteUser(userId: string) {
    await db.delete(UserTable).where(eq(UserTable.id, userId))

    revalidateUserCache(userId)
}
