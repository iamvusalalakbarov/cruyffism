"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useToast, type Toast } from "@/hooks/use-toast"

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => string
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<Omit<Toast, "id">>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, addToast, removeToast, updateToast } = useToast()

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>{children}</ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}
