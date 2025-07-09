import { useEffect, useState } from 'react'

const DARK_MODE_SELECTOR = '(prefers-color-scheme: dark)'

export function useIsDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false

        return window.matchMedia(DARK_MODE_SELECTOR).matches
    })

    useEffect(() => {
        const media = window.matchMedia(DARK_MODE_SELECTOR)

        const handleChangeTheme = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches)
        }

        media.addEventListener('change', handleChangeTheme)

        return () => {
            media.removeEventListener('change', handleChangeTheme)
        }
    }, [])

    return isDarkMode
}
