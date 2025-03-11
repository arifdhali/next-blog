import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    cookieStore.delete("USER_TOKEN");
    return NextResponse.json({
        status: true,
        message: "Logout successfully"
    })


}