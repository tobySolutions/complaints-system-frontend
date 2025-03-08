import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock, CheckCircle, Users } from "lucide-react"
import Link from "next/link"

export default function LecturerDashboard() {
  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Lecturer Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">From all students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Latest complaints from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "1",
                  title: "Assignment Deadline Extension",
                  studentName: "John Doe",
                  courseName: "Computer Science 101",
                  status: "pending",
                },
                {
                  id: "2",
                  title: "Course Material Access",
                  studentName: "Jane Smith",
                  courseName: "Computer Science 101",
                  status: "in-progress",
                },
                {
                  id: "3",
                  title: "Quiz Grade Review",
                  studentName: "Mike Johnson",
                  courseName: "Computer Science 101",
                  status: "resolved",
                },
              ].map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{complaint.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {complaint.studentName} - {complaint.courseName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <Link href={`/lecturer/complaints/${complaint.id}`}>
                      <Button variant="ghost" size="sm">
                        Respond
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
            <CardTitle>Courses Overview</CardTitle>
            <CardDescription>Your assigned courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "1",
                  name: "Computer Science 101",
                  students: 50,
                  pending: 5,
                },
                {
                  id: "2",
                  name: "Advanced Programming",
                  students: 45,
                  pending: 3,
                },
                {
                  id: "3",
                  name: "Data Structures",
                  students: 55,
                  pending: 4,
                },
              ].map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{course.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.students} students, {course.pending} pending complaints
                    </p>
                  </div>
                  <Link href={`/lecturer/courses/${course.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
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

