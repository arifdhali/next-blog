import db from "@/libs/db";
import { NextResponse } from "next/server";
export async function GET() {
    try {
      await db.query("SELECT * from posts");
      console.log('object')
      return NextResponse.json({ message: "✅ Database Connected!" });
    } catch (error) {
      return NextResponse.json({ message: "❌ Database Connection Failed", error }, { status: 500 });
    }
  }