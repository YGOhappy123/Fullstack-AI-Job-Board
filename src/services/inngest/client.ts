import { DeletedObjectJSON, UserJSON } from '@clerk/nextjs/server'
import { EventSchemas, Inngest } from 'inngest'

type ClerkWebhookData<T> = {
    data: {
        data: T
        raw: string
        headers: Record<string, string>
    }
}

type Events = {
    'clerk/user.created': ClerkWebhookData<UserJSON>
    'clerk/user.updated': ClerkWebhookData<UserJSON>
    'clerk/user.deleted': ClerkWebhookData<DeletedObjectJSON>
}

export const inngestClient = new Inngest({
    id: 'next-step-flq',
    schemas: new EventSchemas().fromRecord<Events>()
})

/**
 * FLOW EXPLANATION
 *
 * 1. Handle webhook events from online services:
 * - Online service triggers a raw event (webhook)
 * - Inngest Cloud catches and transforms that event (if configured)
 * - Inngest Cloud sends the transformed event to Inngest Client
 * - Inngest Client executes the corresponding function (verification is required)
 *
 * 2. Handle application events from users:
 * - User manually sends an event request
 * - Inngest Client catches the event
 * - Inngest Client executes  the corresponding function
 */
