import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    return NextResponse.json({ id: params.id, ...body })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json({ message: "Complaint deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete complaint" }, { status: 500 })
  }
}

