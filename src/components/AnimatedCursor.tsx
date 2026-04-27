'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    if (!mediaQuery.matches) return

    const moveCursor = (event: MouseEvent) => {
      if (!cursorRef.current) return

      cursorRef.current.style.left = `${event.clientX}px`
      cursorRef.current.style.top = `${event.clientY}px`
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,122,89,0.85),rgba(50,74,159,0.9))] opacity-60 blur-[3px] transition-all duration-150 ease-out md:block"
    />
  )
}
