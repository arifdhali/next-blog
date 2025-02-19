import BlogCard from "@/components/Blogcard";

export default async function BlogPage() {
    let res = await fetch('http://localhost:3000/api/blog');
    let data = await res.json();
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
