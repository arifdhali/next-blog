import DOMPurify from 'dompurify';
import { BlogTypes } from "@/src/Types";
import Link from "next/link";
type BlogCardProps = {
    data: BlogTypes,
}
export default function BlogCard({ data }: BlogCardProps) {
    const { id, title, thumbnail, slug, content, created_at } = data;
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link href={`blog/${slug}`}>
                <img className="rounded-t-lg h-[200px] w-full object-cover" src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/uploads/${thumbnail}`} alt={title} />
            </Link>
            <div className="p-5">
                <Link href={`blog/${slug}`}>
                    <h5 className="mb-2 text-[20px] font-semibold tracking-tight text-gray-900 dark:text-white">
                        {title.length > 20 ? title.slice(0, 50) +'...' : title}
                    </h5>
                </Link>

                <div
                    className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                ></div>

                <Link
                    href={`blog/${slug}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Read more
                    <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </Link>
            </div>
        </div >
    )
}