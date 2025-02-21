import { ReactNode } from "react";
import Navbar from "@/src/app/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>

    );
}
