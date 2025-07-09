import { serve } from 'inngest/next'
import { inngestClient } from '@/services/inngest/client'
import {
    clerkCreateUser,
    clerkUpdateUser,
    clerkDeleteUser
} from '@/services/inngest/functions/clerk'

export const { GET, POST, PUT } = serve({
    client: inngestClient,
    functions: [clerkCreateUser, clerkUpdateUser, clerkDeleteUser]
})
