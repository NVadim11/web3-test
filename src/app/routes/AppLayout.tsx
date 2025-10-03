import type { ReactNode } from 'react'
import { Header, Menu } from '@widgets'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Menu />
        <main className="flex-1 min-h-0">
          {children}
        </main>
      </div>
    </div>
  )
}
