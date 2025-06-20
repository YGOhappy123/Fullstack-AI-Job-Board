import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { UserTable } from '@/drizzle/schema/user'
import { OrganizationTable } from '@/drizzle/schema/organization'
import { createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'

export const OrganizationUserSettingsTable = pgTable(
    'organization_user_settings',
    {
        userId: varchar() // Refer to a manager, not an applicant
            .notNull()
            .references(() => UserTable.id),
        organizationId: varchar()
            .notNull()
            .references(() => OrganizationTable.id),
        emailNotifications: boolean().notNull().default(false), // If managers want to receive daily notifications about applicants
        minimumRating: integer(), // The minimum rating managers set on applicants
        createdAt: createdAtConstraints,
        updatedAt: updatedAtConstraints
    },
    table => [primaryKey({ columns: [table.userId, table.organizationId] })]
)

export const organizationUserSettingsRelations = relations(OrganizationUserSettingsTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [OrganizationUserSettingsTable.userId],
        references: [UserTable.id]
    }),
    organization: one(OrganizationTable, {
        fields: [OrganizationUserSettingsTable.userId],
        references: [OrganizationTable.id]
    })
}))
