export type User = {
  id: string
  name: string
  email: string
  role: "STUDENT" | "LECTURER"
}

export type Complaint = {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  courseId: string
  courseName: string
  studentName: string
  createdAt: string
}

export type Course = {
  id: string
  code: string
  name: string
  students?: number
  complaints?: number
}

