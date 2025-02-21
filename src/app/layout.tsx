import "@/src/app/globals.css";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { Metadata } from "next";
type Props = {
  slug: string,
}
export async function generateMetadata({ slug }: Props): Promise<Metadata> {
  return {
    title: "My Blog",
  };
}
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--poppins-fonts",  
})



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
