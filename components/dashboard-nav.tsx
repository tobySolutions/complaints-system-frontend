"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, Home, Users } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function DashboardNav() {
  const pathname = usePathname()
  const isStudent = pathname.startsWith("/student")

  const studentNav = [
    {
      title: "Overview",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      title: "Complaints",
      href: "/student/complaints",
      icon: FileText,
    },
  ]

  const lecturerNav = [
    {
      title: "Overview",
      href: "/lecturer/dashboard",
      icon: Home,
    },
    {
      title: "Complaints",
      href: "/lecturer/complaints",
      icon: FileText,
    },
    {
      title: "Students",
      href: "/lecturer/students",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/lecturer/analytics",
      icon: BarChart,
    },
  ]

  const navigation = isStudent ? studentNav : lecturerNav

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

