"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [isPending, startTransition] = useTransition();
    const getAllPosts = async () => {
        startTransition(async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/dashboard/posts`, {
                    method: "GET",
                    cache: "no-cache",
                });
                const data = await res.json();
                if (data.status) {
                    setPosts(data.posts);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        })
    }

    useEffect(() => {
        getAllPosts();
    }, []);


    return (
        <div>
            <div className="flex justify-between">
                <h2>Posts List </h2>
                <Link href={'/dashboard/posts/create'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Post</Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Thumbnails
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Content
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Publish Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <>

                                {!isPending && posts.length > 0 ? (
                                    posts.map((post: any) => (
                                        <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/uploads/${post.thumbnail}`} className="w-[60px] h-[60px] object-cover rounded-full" alt="" />
                                            </th>
                                            <td className="px-6 py-4">{post.title}</td>
                                            <td className="px-6 py-4">Laptop</td>
                                            <td className="px-6 py-4">{post.status}</td>
                                            <td className="px-6 py-4">{format(new Date(post.created_at),'dd-MM-yyyy')}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`posts/${post.id}/edit`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center">
                                            {isPending && "Loading..."}
                                            {!isPending && posts.length < 1 && "No posts"}
                                        </td>
                                    </tr>
                                )
                                }
                            </>
                        }
                    </tbody>


                </table>
            </div>
        </div >
    )

}