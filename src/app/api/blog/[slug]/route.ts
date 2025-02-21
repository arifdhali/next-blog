import db from "@/src/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const [rows]: any = await db.query(`SELECT * FROM posts WHERE slug = ?`, [ slug]);

        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
