import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Your latest submitted complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "1",
                  title: "Assignment Deadline Extension",
                  courseName: "Computer Science 101",
                  status: "pending",
                },
                {
                  id: "2",
                  title: "Course Material Access",
                  courseName: "Mathematics 202",
                  status: "resolved",
                },
              ].map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{complaint.title}</h3>
                    <p className="text-sm text-muted-foreground">{complaint.courseName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={complaint.status === "pending" ? "secondary" : "success"}>{complaint.status}</Badge>
                    <Link href={`/student/complaints/${complaint.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Your enrolled courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "1",
                  name: "Computer Science 101",
                  complaints: 3,
                },
                {
                  id: "2",
                  name: "Mathematics 202",
                  complaints: 2,
                },
                {
                  id: "3",
                  name: "Physics 101",
                  complaints: 0,
                },
              ].map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{course.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.complaints} complaints</p>
                  </div>
                  <Link href={`/student/complaints/new?courseId=${course.id}`}>
                    <Button variant="outline" size="sm">
                      Submit Complaint
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

