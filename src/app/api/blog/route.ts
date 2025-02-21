import db from "@/src/libs/db";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM posts ORDER BY created_at DESC LIMIT 10");
        return NextResponse.json(rows);
    } catch (error) {
        console.error("❌ Database Query Error:", error);
        return NextResponse.json(
            { message: "❌ Database Error", error: error.message },
            { status: 500 }
        );
    }
}