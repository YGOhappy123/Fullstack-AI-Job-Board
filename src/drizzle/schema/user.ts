import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { clerkIdPkConstraints, createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'
import { JobApplicationTable } from '@/drizzle/schema/jobApplication'
import { UserResumeTable } from '@/drizzle/schema/userResume'
import { UserNotificationSettingsTable } from '@/drizzle/schema/userNotificationSettings'
import { OrganizationUserSettingsTable } from '@/drizzle/schema/organizationUserSettings'

export const UserTable = pgTable('users', {
    id: clerkIdPkConstraints,
    name: varchar().notNull(),
    imageUrl: varchar().notNull(),
    email: varchar().notNull().unique(),
    createdAt: createdAtConstraints,
    updatedAt: updatedAtConstraints
})

export const userRelations = relations(UserTable, ({ one, many }) => ({
    resume: one(UserResumeTable),
    applications: many(JobApplicationTable),
    notificationSettings: one(UserNotificationSettingsTable),
    organizationUserSettings: many(OrganizationUserSettingsTable)
}))
