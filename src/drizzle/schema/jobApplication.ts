import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, primaryKey, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'
import { UserTable } from '@/drizzle/schema/user'
import { JobListingTable } from '@/drizzle/schema/jobListing'

export const applicationStages = ['denied', 'applied', 'interested', 'interviewed', 'hired'] as const
export const applicationStageEnum = pgEnum('jas_stage', applicationStages)

export const JobApplicationTable = pgTable(
    'job_applications',
    {
        jobListingId: uuid()
            .references(() => JobListingTable.id, { onDelete: 'cascade' })
            .notNull(),
        userId: varchar()
            .references(() => UserTable.id, { onDelete: 'cascade' })
            .notNull(),
        coverLetter: text(),
        rating: integer(), // Can either be rated manually by employers or automatically by AI or left empty
        stage: applicationStageEnum().notNull().default('applied'),
        createdAt: createdAtConstraints,
        updatedAt: updatedAtConstraints
    },
    table => [primaryKey({ columns: [table.jobListingId, table.userId] })]
)

export const jobApplicationRelations = relations(JobApplicationTable, ({ one }) => ({
    jobListing: one(JobListingTable, {
        fields: [JobApplicationTable.jobListingId],
        references: [JobListingTable.id]
    }),
    user: one(UserTable, {
        fields: [JobApplicationTable.userId],
        references: [UserTable.id]
    })
}))

export type ApplicationStage = (typeof applicationStages)[number]
