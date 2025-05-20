// components/ui/popover-dialog.tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

// **NOTA**: eliminamos Por tal wrapper, de modo que el contenido se monte en el mismo DOM
// en lugar de portalizarlo fuera del modal.
function PopoverContent({
  children,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "z-[1000] w-auto animate-in fade-in-0 zoom-in-95 overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  )
}

const PopoverClose = PopoverPrimitive.Close
const PopoverAnchor = PopoverPrimitive.Anchor

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
}
