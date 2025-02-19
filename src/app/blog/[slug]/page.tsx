
async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    let res = await fetch(`http://localhost:3000/api/blog/${slug}`);
    let data = res.json();

    return (
        <div>
            <h2>Single page {slug}</h2>
        </div>
    )
}

export default page
