import db from "@/src/libs/db";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";
import fs from "fs"
import slug from 'slug'
export async function POST(request: NextRequest) {

    try {


        const formData = await request.formData();
        const { content, status } = Object.fromEntries(formData.entries());
        const thumbnail = formData.get("thumbnail") as File | null;
        let title = formData.get('title') as string;
        if (!thumbnail) {
            return NextResponse.json({ status: false, message: "No file uploaded" });
        }
        let urlToSlug = slug(title, { lower: true });

        let buffer = Buffer.from(await thumbnail.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public/uploads");
        fs.mkdirSync(uploadDir, {
            recursive: true,
        })
        const fileName = `${new Date().getTime()}-${title}-${thumbnail.name}`;
        let filePath = path.join(uploadDir, fileName)
        console.log(filePath);
        let dbColumns = {
            title: title,
            slug: urlToSlug,
            content: content,
            thumbnail: fileName,
            status: status
        }
        let field = Object.keys(dbColumns).join(",");
        const placeholders = Object.keys(dbColumns).map(() => "?").join(", ");
        let fieldValues = Object.values(dbColumns);

        let inserPost = `INSERT INTO posts (${field}) VALUES(${placeholders})`;
        let [insertResponse] = await db.query(inserPost, fieldValues) as any;
        if (insertResponse.affectedRows >= 1) {
            fs.writeFileSync(filePath, buffer);
            return NextResponse.json({
                status: true,
                message: "Post created succssfully"
            })
        }
    } catch (error) {
        console.error("Error in POST /api/dashboard/posts/create:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" });
    }

}