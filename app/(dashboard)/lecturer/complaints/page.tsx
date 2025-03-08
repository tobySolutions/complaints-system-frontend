"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import type { Complaint } from "@/types"

export default function LecturerComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState("")
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchComplaints() {
      try {
        // In a real app, you'd pass the actual lecturerId
        const res = await fetch("/api/complaints?role=LECTURER")
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

  async function handleResponse(complaintId: string) {
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: response,
          complaintId,
          userId: "lecturer_1", // In a real app, this would be the actual lecturer ID
        }),
      })

      if (!res.ok) throw new Error("Failed to submit response")

      // Update the complaint status in the UI
      setComplaints(complaints.map((c) => (c.id === complaintId ? { ...c, status: "in-progress" as const } : c)))

      // Reset form
      setResponse("")
      setSelectedComplaintId(null)
    } catch (error) {
      console.error("Error submitting response:", error)
    }
  }

  async function handleStatusUpdate(complaintId: string, status: "resolved") {
    try {
      const res = await fetch(`/api/complaints/${complaintId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error("Failed to update status")

      // Update the complaint status in the UI
      setComplaints(complaints.map((c) => (c.id === complaintId ? { ...c, status } : c)))
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  if (loading) {
    return <div className="container px-4 py-6">Loading...</div>
  }

  return (
    <div className="container px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold">Complaints Management</h1>
        <p className="text-muted-foreground">View and manage student complaints for your courses</p>
      </div>
      <Tabs defaultValue="pending" className="mt-6">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        {["pending", "in-progress", "resolved"].map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <div className="grid gap-4">
              {complaints
                .filter((c) => c.status === status)
                .map((complaint) => (
                  <ComplaintCard
                    key={complaint.id}
                    complaint={complaint}
                    onRespond={(id) => setSelectedComplaintId(id)}
                    onResolve={() => handleStatusUpdate(complaint.id, "resolved")}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedComplaintId} onOpenChange={() => setSelectedComplaintId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Complaint</DialogTitle>
            <DialogDescription>Provide your response to the student's complaint</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Response</label>
              <Textarea
                placeholder="Type your response here..."
                className="mt-1"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedComplaintId(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedComplaintId && handleResponse(selectedComplaintId)}
              disabled={!response.trim()}
            >
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ComplaintCard({
  complaint,
  onRespond,
  onResolve,
}: {
  complaint: Complaint
  onRespond: (id: string) => void
  onResolve: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{complaint.title}</CardTitle>
            <CardDescription>
              From {complaint.studentName} - {complaint.courseName}
            </CardDescription>
          </div>
          <Badge
            variant={
              complaint.status === "pending" ? "secondary" : complaint.status === "in-progress" ? "default" : "success"
            }
          >
            {complaint.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{complaint.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onRespond(complaint.id)}>
            Respond
          </Button>
          {complaint.status !== "resolved" && (
            <Button size="sm" onClick={onResolve}>
              Mark as Resolved
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

