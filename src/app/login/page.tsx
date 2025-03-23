"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import '@/styles/globals.css'


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:3002/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        
        if (res.ok) {
            const data = await res.json();
            if (isClient) { 
                localStorage.setItem("token", data.acces_token);
            }
            router.push("/admin");             
        } else {
            alert('Invalid credentials. Try again.')
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white shadow-lg p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
