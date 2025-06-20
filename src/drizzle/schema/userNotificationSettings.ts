import { relations } from 'drizzle-orm'
import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core'
import { UserTable } from '@/drizzle/schema/user'
import { createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'

export const UserNotificationSettingsTable = pgTable('user_notification_settings', {
    userId: varchar() // Refer to an applicant
        .primaryKey()
        .references(() => UserTable.id),
    emailNotifications: boolean().notNull().default(false), // If applicants want to receive daily notifications on new jobs
    aiPrompt: varchar(),
    createdAt: createdAtConstraints,
    updatedAt: updatedAtConstraints
})

export const userNotificationSettingsRelations = relations(UserNotificationSettingsTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [UserNotificationSettingsTable.userId],
        references: [UserTable.id]
    })
}))
