"use client";
import DOMPurify from 'dompurify'
type Params = {
    slug: string,
}

async function page({ params }: { params: Params; }) {

    if (!params || !params?.slug) {
        return <div>Loading...</div>;

    }
    const { slug } = await params;

    let res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blog/${slug}`, {
        method: 'GET',
    });
    let data = await res.json();
    const contentHTML = DOMPurify.sanitize(data.content);

    return (
        <div className="max-w-[992px] mx-auto py-10 px-4">
            <img className="rounded-[8px] w-full h-[400px] object-cover" src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/uploads/${data.thumbnail}`} alt={data.title} />
            <h2 className="font-bold text-[50px]">{data.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: contentHTML }}
            >
            </div>
        </div>
    )
}

export default page
