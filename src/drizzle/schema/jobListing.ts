import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, varchar, boolean, timestamp, index } from 'drizzle-orm/pg-core'
import { uuidPkConstraints, createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'
import { OrganizationTable } from '@/drizzle/schema/organization'
import { JobApplicationTable } from '@/drizzle/schema/jobApplication'

export const wageIntervals = ['hourly', 'monthly', 'yearly'] as const
export const wageIntervalEnum = pgEnum('jls_wage_interval', wageIntervals)

export const locationRequirements = ['in-office', 'hybrid', 'remote'] as const
export const locationRequirementEnum = pgEnum('jls_location_requirement', locationRequirements)

export const experienceLevels = ['junior', 'mid-level', 'senior'] as const
export const experienceLevelEnum = pgEnum('jls_experience_level', experienceLevels)

// "Draft" = not been published, "Delisted" = been removed from the job board
export const jobStatuses = ['draft', 'published', 'delisted'] as const
export const jobStatusEnum = pgEnum('jls_status', jobStatuses)

export const jobTypes = ['internship', 'part-time', 'full-time'] as const
export const jobTypeEnum = pgEnum('jls_type', jobTypes)

export const JobListingTable = pgTable(
    'job_listings',
    {
        id: uuidPkConstraints,
        organizationId: varchar()
            .references(() => OrganizationTable.id, { onDelete: 'cascade' })
            .notNull(),
        title: varchar().notNull(),
        description: text().notNull(),
        wage: integer(), // Job's salary
        wageInterval: wageIntervalEnum(), // Salary for given time
        stateAbbreviation: varchar(), // Refer to locations of countries with states. Eg: Canada, USA, etc
        city: varchar(),
        isFeatured: boolean().notNull().default(false), // Eg: Appearing at the top of search results
        locationRequirement: locationRequirementEnum().notNull(),
        experienceLevel: experienceLevelEnum().notNull(),
        status: jobStatusEnum().notNull().default('draft'),
        type: jobTypeEnum().notNull(),
        postedAt: timestamp({ withTimezone: true }), // The published time (changed from "Draft" status)
        createdAt: createdAtConstraints,
        updatedAt: updatedAtConstraints
    },
    table => [index().on(table.stateAbbreviation)]
)

export const jobListingReferences = relations(JobListingTable, ({ one, many }) => ({
    organization: one(OrganizationTable, {
        fields: [JobListingTable.organizationId],
        references: [OrganizationTable.id]
    }),
    applications: many(JobApplicationTable)
}))

export type WageInterval = (typeof wageIntervals)[number]
export type LocationRequirement = (typeof locationRequirements)[number]
export type ExperienceLevel = (typeof experienceLevels)[number]
export type JobStatus = (typeof jobStatuses)[number]
export type JobType = (typeof jobTypes)[number]
