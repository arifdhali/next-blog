import LoginForm from "@/src/app/components/Login_form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function LoginPage() {
    let cookie = await cookies();
    let token = cookie.get('USER_TOKEN')?.value;
    if (token) {
        redirect("/dashboard")
    }
    return (
        <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <LoginForm />
            </div>
        </div>
    );
}
