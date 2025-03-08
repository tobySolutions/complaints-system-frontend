"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import type { Complaint } from "@/types"

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchComplaints() {
      try {
        // In a real app, you'd pass the actual userId
        const res = await fetch("/api/complaints?userId=1&role=STUDENT")
        if (!res.ok) throw new Error("Failed to fetch complaints")
        const data = await res.json()
        setComplaints(data)
      } catch (error) {
        console.error("Error fetching complaints:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesCourse = courseFilter === "all" || complaint.courseId === courseFilter
    return matchesStatus && matchesCourse
  })

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete complaint")

      // Remove the deleted complaint from state
      setComplaints(complaints.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Error deleting complaint:", error)
    }
  }

  if (loading) {
    return <div className="container px-4 py-6">Loading...</div>
  }

  return (
    <div className="container px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Complaints</h1>
          <p className="text-muted-foreground">View and manage your complaints</p>
        </div>
        <Link href="/student/complaints/new">
          <Button>New Complaint</Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="cs101">Computer Science 101</SelectItem>
            <SelectItem value="math202">Mathematics 202</SelectItem>
            <SelectItem value="phy101">Physics 101</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{complaint.title}</CardTitle>
                <Badge
                  variant={
                    complaint.status === "pending"
                      ? "secondary"
                      : complaint.status === "in-progress"
                        ? "default"
                        : "success"
                  }
                >
                  {complaint.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {complaint.courseName} • Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{complaint.description}</p>
              <div className="flex items-center gap-2">
                <Link href={`/student/complaints/${complaint.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(complaint.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

