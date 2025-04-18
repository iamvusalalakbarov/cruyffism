"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, User } from "lucide-react"
import { login } from "@/actions/auth-actions"
import { useToastContext } from "@/contexts/toast-context"

export default function LoginPage() {
  const router = useRouter()
  const { addToast } = useToastContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const result = await login(formData)

      if (result.success) {
        addToast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
          type: "success",
        })
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Login failed")
        addToast({
          title: "Login failed",
          description: result.error || "Invalid username or password",
          type: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      setError("An unexpected error occurred")
      addToast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "destructive",
      })
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
          Cruyffism
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your credentials to access the admin dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="username"
              name="username"
              type="text"
              required
              className="pl-10"
              placeholder="admin"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="pl-10"
              placeholder="password"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Logging in...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link href="/" className="text-orange-600 hover:text-orange-700 dark:text-orange-500">
          Return to website
        </Link>
      </div>
    </div>
  )
}
