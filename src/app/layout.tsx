import React from "react"
import '@/styles/globals.css'
import { ReduxProvider } from "@/store/provider"

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <head>
                <title>Clinic Website</title>
            </head>
            <html lang="en">
                <body>
                    <ReduxProvider>{children}</ReduxProvider>
                </body>
            </html>
        </>
        
    )
}

export default RootLayout