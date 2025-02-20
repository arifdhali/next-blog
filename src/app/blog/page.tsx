import BlogCard from "@/components/Blogcard";
import { BlogTypes } from "@/Types";
export default async function BlogPage() {
    let res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blog`);
    let data: BlogTypes[] = await res.json();
    return (
        <section className="max-w-[992px] mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-6">All Blogs</h2>
            <div className="grid grid-cols-3 gap-5">
                {data && data.map((blog) => (
                    <BlogCard key={blog.id} data={blog} />
                ))}
            </div>
        </section>
    );
}
