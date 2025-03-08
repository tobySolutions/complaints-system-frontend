import type React from "react"
import { Header } from "@/components/header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 items-start md:grid md:grid-cols-[280px_1fr]">
          <Sidebar className="hidden md:block">
            <SidebarContent>
              <DashboardNav />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

