import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Note: Libs still work without their variables being explicitly listed here
// ... as long as those required variables are provided in the ".env" file
export const env = createEnv({
    client: {
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
        NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string().min(1),
        NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string().min(1),
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1)
    },
    emptyStringAsUndefined: true,

    // "client" variables required to be listed explicitly rather than using "process.env"
    experimental__runtimeEnv: {
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    }
})
