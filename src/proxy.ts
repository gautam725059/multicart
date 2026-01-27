import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from './auth'
 

export async function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl
    const publicRoute = ["/login", "/register", "/api/auth","favicon.ico",
        "/_next"]
    if (publicRoute.some(path => pathname.startsWith(path))) { 
        return NextResponse.next()
    }
    const session = await auth()
    if (!session) {
       const loginUrl = new URL('/login', request.url)
       loginUrl.searchParams.set('callbackUrl', request.url)
       return NextResponse.redirect(loginUrl)
    }
     return NextResponse.next()
    
}
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$.*)'
        
    ]
}
