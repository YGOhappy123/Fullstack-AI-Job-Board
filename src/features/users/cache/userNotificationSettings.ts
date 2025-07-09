import { revalidateTag } from 'next/cache'
import { getGlobalTag, getIdTag } from '@/lib/dataCache'

export function getUserNotificationSettingsGlobalCacheTag() {
    return getGlobalTag('userNotificationSettings')
}

export function getUserNotificationSettingsIdCacheTag(userId: string) {
    return getIdTag('userNotificationSettings', userId)
}

export function revalidateUserNotificationSettingsCache(userId: string) {
    revalidateTag(getUserNotificationSettingsGlobalCacheTag())
    revalidateTag(getUserNotificationSettingsIdCacheTag(userId))
}
