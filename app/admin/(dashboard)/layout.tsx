"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Inter } from "next/font/google"
import "../../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChevronLeft, ChevronRight, FileText, Home, LayoutDashboard, Menu, Tag, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { initializeAdmin } from "../init"
import { ToastProvider } from "@/contexts/toast-context"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Initialize admin user when the dashboard loads
    initializeAdmin()
  }, [])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          isActive
            ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-300"
            : "hover:bg-gray-100 dark:hover:bg-gray-800",
          collapsed && "justify-center px-2",
        )}
        onClick={() => setMobileOpen(false)}
      >
        <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
        {!collapsed && <span>{label}</span>}
      </Link>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <div className="flex min-h-screen bg-orange-50 dark:bg-neutral-900">
              {/* Mobile sidebar backdrop */}
              {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
              )}

              {/* Sidebar */}
              <aside
                className={cn(
                  "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white dark:bg-neutral-800 dark:border-neutral-700 transition-all duration-300",
                  collapsed ? "w-16" : "w-64",
                  mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                )}
              >
                <div
                  className={cn(
                    "flex h-16 items-center border-b dark:border-gray-800 px-4",
                    collapsed ? "justify-center" : "justify-between",
                  )}
                >
                  {!collapsed && (
                    <Link
                      href="/"
                      className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Cruyffism
                    </Link>
                  )}
                  <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {!collapsed && (
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Main</p>
                  )}
                  <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
                  <NavItem href="/admin/dashboard/articles" icon={FileText} label="Articles" />
                  <NavItem href="/admin/dashboard/quotes" icon={Quote} label="Quotes" />
                  <NavItem href="/admin/dashboard/tags" icon={Tag} label="Tags" />

                  {!collapsed && (
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-6 mb-2 uppercase">Other</p>
                  )}
                  <NavItem href="/" icon={Home} label="View Site" />
                </nav>

                <div
                  className={cn(
                    "p-4 border-t dark:border-gray-800 flex items-center",
                    collapsed ? "justify-center" : "justify-between",
                  )}
                >
                  {!collapsed && <div className="text-sm">Admin Panel</div>}
                  <ThemeToggle />
                </div>
              </aside>

              {/* Main content */}
              <div className={cn("flex flex-col flex-1 min-h-screen", collapsed ? "md:ml-16" : "md:ml-64")}>
                <header className="h-16 border-b dark:border-neutral-800 flex items-center justify-between px-4 bg-white dark:bg-neutral-800 sticky top-0 z-10">
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden mr-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold">
                      {pathname === "/admin/dashboard" && "Dashboard"}
                      {pathname === "/admin/dashboard/articles" && "Articles"}
                      {pathname === "/admin/dashboard/tags" && "Tags"}
                      {pathname === "/admin/dashboard/quotes" && "Quotes"}
                      {pathname.includes("/admin/dashboard/articles/new") && "New Article"}
                      {pathname.includes("/admin/dashboard/articles/edit") && "Edit Article"}
                      {pathname.includes("/admin/dashboard/quotes/new") && "New Quote"}
                      {pathname.includes("/admin/dashboard/quotes/edit") && "Edit Quote"}
                    </h1>
                  </div>
                  <UserAvatar username="Admin User" />
                </header>
                <div className="flex-1 p-4 md:p-6 overflow-auto">
                  <div className="w-full max-w-full overflow-x-auto">{children}</div>
                </div>
              </div>
            </div>
            <ScrollToTop />
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
