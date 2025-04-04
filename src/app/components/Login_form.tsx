"use client";
import React, { useEffect, useTransition } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { Authentication } from "@/src/Types";
import * as Yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const formik = useFormik<Authentication>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: async (values) => {
            startTransition(async () => {
                let response = await fetch(`/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                    credentials: "include"
                });

                let data = await response.json();
                if (!data.status) {
                    toast.error(data?.message);
                } else {
                    toast.success(data?.message);
                    router.push("/dashboard");
                }
            });
        },
    });

    useEffect(() => {
        const { errors } = formik;
        let keys = Object.keys(errors);
        let firstError = document.querySelector(`[name=${keys[0]}]`);
        if (firstError) {
            (firstError as HTMLInputElement).focus();
        }
    }, [formik.isSubmitting]);

    return (
        <>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
                            }`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <small className="text-red-600">{formik.errors.email}</small>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        name="password"
                        type="password"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"
                            }`}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <small className="text-red-600">{formik.errors.password}</small>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? "Loggin..." : "Login"}
                </button>
            </form>

            <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-500 hover:underline">
                    Register
                </Link>
            </p>
        </>
    );
}
