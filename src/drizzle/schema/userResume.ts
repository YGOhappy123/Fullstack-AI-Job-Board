import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { UserTable } from '@/drizzle/schema/user'
import { createdAtConstraints, updatedAtConstraints } from '@/drizzle/schemaHelpers'

export const UserResumeTable = pgTable('user_resumes', {
    userId: varchar() // Refer to an applicant
        .primaryKey()
        .references(() => UserTable.id),
    resumeFileUrl: varchar().notNull(),
    resumeFileKey: varchar().notNull(), // Unique key used to interact with external file managing systems
    aiSummary: varchar(), // Generated when user want to summary the resume using AI
    createdAt: createdAtConstraints,
    updatedAt: updatedAtConstraints
})

export const userResumeRelations = relations(UserResumeTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [UserResumeTable.userId],
        references: [UserTable.id]
    })
}))
