import { ReactNode } from "react";
import Navbar from "@/src/app/components/Navbar";
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
