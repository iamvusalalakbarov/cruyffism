"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

const TOAST_DURATION = 5000 // 5 seconds

type ToastType = "default" | "destructive" | "success"

interface Toast {
  id: string
  title?: string
  description?: string
  type?: ToastType
  duration?: number
  action?: React.ReactNode
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    ({ title, description, type = "default", duration = TOAST_DURATION, action }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prevToasts) => [...prevToasts, { id, title, description, type, duration, action }])
      return id
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const updateToast = useCallback((id: string, toast: Partial<Omit<Toast, "id">>) => {
    setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, ...toast } : t)))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((toast) => {
        return setTimeout(() => {
          removeToast(toast.id)
        }, toast.duration)
      })

      return () => {
        timers.forEach((timer) => clearTimeout(timer))
      }
    }
  }, [toasts, removeToast])

  return {
    toasts,
    addToast,
    removeToast,
    updateToast,
  }
}

export type { Toast, ToastType }
