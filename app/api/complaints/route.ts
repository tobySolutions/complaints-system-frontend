import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Mock data
// const complaints = [
//   {
//     id: "1",
//     title: "Assignment Deadline Extension",
//     description: "Need extension for the final project submission",
//     status: "pending",
//     studentId: "1",
//     courseId: "cs101",
//     student: {
//       name: "John Doe",
//       email: "john@university.edu",
//     },
//     course: {
//       name: "Computer Science 101",
//     },
//     createdAt: "2024-02-25T00:00:00.000Z",
//     responses: [],
//   },
//   // Add more mock complaints as needed
// ]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, courseId, studentId } = body

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        courseId,
        studentId,
      },
    })

    return NextResponse.json(complaint)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    const role = searchParams.get("role")

    const complaints = await prisma.complaint.findMany({
      where: role === "STUDENT" ? { studentId: userId } : undefined,
      include: {
        student: {
          select: {
            name: true,
            email: true,
          },
        },
        course: true,
        responses: {
          include: {
            user: {
              select: {
                name: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(complaints)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
  }
}

