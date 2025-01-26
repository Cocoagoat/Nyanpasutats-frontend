import { NextRequest, NextResponse } from "next/server";
// This Route Handler exists for the purpose of sending a server-side POST
// request to save the image a user wants to share. Request must be server-side
// to comply with Nginx's configuration to allow requests to the backend only
// from the frontend and deny any direct access from the user.
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const response = await fetch("https://nps.moe/api/upload_infographic_img/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Django request failed" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}