import SanitizedContent from '@/src/app/components/SanitaizeContent';

type Params = {
    slug: string;
};

async function getBlogData(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blog/${slug}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export default async function Page({ params }: { params: Params }) {
    if (!params || !params.slug) {
        return <div>Loading...</div>
    }
    const { slug } = params;
    const data = await getBlogData(slug);
    if (!data) {
        return <div>Blog not found</div>;
    }
    return (
        <div className="max-w-[992px] mx-auto py-10 px-4">
            <img
                className="rounded-[8px] w-full h-[400px] object-cover"
                src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/uploads/${data.thumbnail}`}
                alt={data.title}
            />
            <h2 className="font-bold text-[50px]">{data.title}</h2>
            <SanitizedContent content={data.content} />
        </div>
    );
}
