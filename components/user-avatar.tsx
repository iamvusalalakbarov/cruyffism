"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import { logout } from "@/actions/auth-actions"
import { useToastContext } from "@/contexts/toast-context"

interface UserAvatarProps {
  username: string
}

export function UserAvatar({ username }: UserAvatarProps) {
  const router = useRouter()
  const { addToast } = useToastContext()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Get initials from username
  const initials = username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const result = await logout()
      if (result.success) {
        addToast({
          title: "Logged out",
          description: "You have been successfully logged out",
          type: "success",
        })
        router.push("/admin/login")
        router.refresh()
      }
    } catch (error) {
      console.error("Error logging out:", error)
      addToast({
        title: "Error",
        description: "Failed to log out",
        type: "destructive",
      })
      setIsLoggingOut(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:inline-block">{username}</span>
          <Avatar className="h-8 w-8">
            {/*<AvatarImage src="/placeholder.svg" alt={username} />*/}
            <AvatarFallback className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
