'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MainHeader from "./MainHeader";
import type { CATEGORY_TYPE } from "@/types/types";

type HeaderSession = {
    session?: {
        token?: string
    } | null
    user?: {
        id?: string
    } | null
} | null

export default function HeaderWraper({productCategories}:{productCategories:CATEGORY_TYPE[]}) {
    const [session, setSession] = useState<HeaderSession>(null)
    const [isPending, setIsPending] = useState(true)

    const Location = usePathname()

    useEffect(() => {
        const controller = new AbortController()

        fetch('/api/auth/get-session', { signal: controller.signal })
            .then((response) => response.ok ? response.json() : null)
            .then((nextSession: HeaderSession) => setSession(nextSession))
            .catch(() => setSession(null))
            .finally(() => setIsPending(false))

        return () => controller.abort()
    }, [Location])
    const profileHeader = Location.startsWith(`/user/profile`)
    const CategoryHeader = Location.startsWith('/category')
    const registerHeader =
        Location === '/user/registeration' && !profileHeader
        
    return (
        <div>
            <MainHeader
                CategoryHeader={CategoryHeader}
                isLoading={isPending}
                registerHeader = {registerHeader}
                profile={profileHeader}
                session={session}
                productCategories={productCategories}
            />
        </div>
    )
}
