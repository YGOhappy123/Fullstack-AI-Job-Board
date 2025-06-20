import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { clerkIdPkConstraints, createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'
import { JobListingTable } from '@/drizzle/schema/jobListing'
import { OrganizationUserSettingsTable } from '@/drizzle/schema/organizationUserSettings'

export const OrganizationTable = pgTable('organizations', {
    id: clerkIdPkConstraints,
    name: varchar().notNull(),
    imageUrl: varchar(),
    createdAt: createdAtConstraints,
    updatedAt: updatedAtConstraints
})

export const organizationRelations = relations(OrganizationTable, ({ many }) => ({
    jobListings: many(JobListingTable),
    organizationUserSettings: many(OrganizationUserSettingsTable)
}))
