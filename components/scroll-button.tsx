"use client"

import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import type { ReactNode } from "react"

interface ScrollButtonProps extends ButtonProps {
  targetId: string
  children: ReactNode
}

export function ScrollButton({ targetId, children, ...props }: ScrollButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
