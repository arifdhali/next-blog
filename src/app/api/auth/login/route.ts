import db from "@/libs/db";
import { RowDataPacket } from "mysql2";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    let cookie = await cookies();
    try {

        const result = await request.json();
        const { email, password } = result;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }
        try {
            let query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
            let [rows] = await db.query<RowDataPacket[]>(query, [email]);
            if (rows.length > 0) {
                let user = rows[0];
                console.log(user.password)
                if (user.password == password) {
                    let token = jwt.sign(
                        {
                            user_info: user.id,
                        }, process.env.SECRET_KEY || 'secret',
                        {
                            expiresIn: '2d'
                        });
                    cookie.set(
                        'USER_TOKEN',
                        token,
                        {
                            httpOnly: true,
                            secure: true,
                            maxAge: 2 * 24 * 60 * 60
                        }
                    )
                    return NextResponse.json({
                        status: true,
                        message: "Login successful",
                        user
                    })
                } else {
                    return NextResponse.json({
                        status: false,
                        message: "Invalid credentials! please try again"
                    })
                }
            } else {
                return NextResponse.json({
                    status: false,
                    message: "User not found"
                })
            }
        } catch (dbError) {
            console.log('db ERROR', dbError);
        }
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
