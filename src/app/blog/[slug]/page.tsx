import { BlogTypes } from "@/Types";

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
    return (
        <div className="max-w-[992px] mx-auto py-10 px-4">
            <img className="rounded-[8px] w-full h-[400px] object-cover" src={data.thumbnail} alt="" />
            <h2 className="font-bold text-[50px]">{data.title}</h2>
            <div>
                {data.content}
            </div>
        </div>
    )
}

export default page
