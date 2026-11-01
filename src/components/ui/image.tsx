"use client"

import NextImage from "next/image"
import * as React from "react"

import { cn } from "@/lib/utils"

const Image = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof NextImage>
>(({ className, ...props }, ref) => {
  const [isLoading, setIsLoading] = React.useState(true)

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-secondary/50",
        isLoading && "animate-pulse",
        className
      )}
    >
      <NextImage
        {...props}
        className="size-full object-cover"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
})
Image.displayName = "Image"

export { Image }
