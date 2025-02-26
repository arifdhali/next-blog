import db from "@/src/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        let getSql = `SELECT id, title, slug, content, status,created_at, thumbnail FROM posts ORDER BY created_at DESC LIMIT 10`;
        let [response] = await db.query(getSql);

        return NextResponse.json({ status: true, posts: response });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ status: false, message: "Something went wrong!" }, { status: 500 });
    }
}
