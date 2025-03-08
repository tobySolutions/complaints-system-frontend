import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = {
      id: "response_" + Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    }
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create response" }, { status: 500 })
  }
}

