import { revalidateTag } from 'next/cache'
import { getGlobalTag, getIdTag } from '@/lib/dataCache'

export function getUserGlobalCacheTag() {
    return getGlobalTag('users')
}

export function getUserIdCacheTag(userId: string) {
    return getIdTag('users', userId)
}

export function revalidateUserCache(userId: string) {
    revalidateTag(getUserGlobalCacheTag())
    revalidateTag(getUserIdCacheTag(userId))
}
