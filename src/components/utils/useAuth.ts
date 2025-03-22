"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const useAuth =  () => {
    const router = useRouter()

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                router.replace('/login')
            } else {
                try {
                    const response = await fetch('http://localhost:3002/api/auth/check', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token })
                    })                    

                    if(response.ok){
                        const data = await response.json()                        
                        if(!data.valid){
                        localStorage.removeItem('token')
                        router.replace('/login')
                        }
                    }
                } catch (error) {
                    console.error("Error validating token:", error)
                    localStorage.removeItem('token')
                    router.replace('/login')
                }
            }
        }
       validateToken()
    }, [router])

    return
}

export default useAuth