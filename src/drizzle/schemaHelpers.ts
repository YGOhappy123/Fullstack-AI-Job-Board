import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const clerkIdPkConstraints = varchar().primaryKey()

export const uuidPkConstraints = uuid().primaryKey().defaultRandom()

export const createdAtConstraints = timestamp({ withTimezone: true }).notNull().defaultNow()

export const updatedAtConstraints = timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
