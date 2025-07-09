import { Webhook } from 'svix'
import { NonRetriableError } from 'inngest'
import { inngestClient } from '@/services/inngest/client'
import { env } from '@/data/env/server'
import { insertUser, updateUser, deleteUser } from '@/features/users/db/users'
import { insertUserNotificationSettings } from '@/features/users/db/userNotificationSettings'

const verifyWebhook = ({ raw, headers }: { raw: string; headers: Record<string, string> }) => {
    return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers)
}

export const clerkCreateUser = inngestClient.createFunction(
    {
        id: 'clerk/create-db-user',
        name: 'Clerk - Create DB User'
    },
    {
        event: 'clerk/user.created'
    },
    async ({ event, step }) => {
        await step.run('verify-webhook', async () => {
            try {
                verifyWebhook(event.data)
            } catch {
                throw new NonRetriableError('Invalid webhook')
            }
        })

        const userId = await step.run('insert-user-to-db', async () => {
            const userData = event.data.data

            // Each account in Clerk might have multiple emails, but only one is primary
            const primary_email = userData.email_addresses.find(
                email => email.id === userData.primary_email_address_id
            )

            if (primary_email == null) {
                throw new NonRetriableError('Primary email address not found')
            }

            await insertUser({
                id: userData.id,
                name: `${userData.last_name} ${userData.first_name}`,
                imageUrl: userData.image_url,
                email: primary_email.email_address,
                createdAt: new Date(userData.created_at),
                updatedAt: new Date(userData.updated_at)
            })

            return userData.id
        })

        await step.run('create-user-notification-settings', async () => {
            await insertUserNotificationSettings({ userId })
        })
    }
)

export const clerkUpdateUser = inngestClient.createFunction(
    {
        id: 'clerk/update-db-user',
        name: 'Clerk - Update DB User'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({ event, step }) => {
        await step.run('verify-webhook', async () => {
            try {
                verifyWebhook(event.data)
            } catch {
                throw new NonRetriableError('Invalid webhook')
            }
        })

        await step.run('update-user-on-db', async () => {
            const userData = event.data.data

            // Each account in Clerk might have multiple emails, but only one is primary
            const primary_email = userData.email_addresses.find(
                email => email.id === userData.primary_email_address_id
            )

            if (primary_email == null) {
                throw new NonRetriableError('Primary email address not found')
            }

            await updateUser(userData.id, {
                name: `${userData.first_name} ${userData.last_name}`,
                imageUrl: userData.image_url,
                email: primary_email.email_address,
                updatedAt: new Date(userData.updated_at)
            })
        })
    }
)

export const clerkDeleteUser = inngestClient.createFunction(
    {
        id: 'clerk/delete-db-user',
        name: 'Clerk - Delete DB User'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({ event, step }) => {
        await step.run('verify-webhook', async () => {
            try {
                verifyWebhook(event.data)
            } catch {
                throw new NonRetriableError('Invalid webhook')
            }
        })

        await step.run('delete-user-from-db', async () => {
            const { id } = event.data.data
            if (id == null) {
                throw new NonRetriableError('User not found')
            }

            await deleteUser(id)
        })
    }
)
