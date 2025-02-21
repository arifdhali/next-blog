import Tiptap from "@/src/app/components/Tiptap";

export default function CreatePost() {


    return (
        <>
            <div className="mb-6">
                <label
                    htmlFor="title-input"
                    className="block mb-2 text-md font-normal text-gray-900"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title-input"
                    className="block w-full border border-gray-400 rounded-md px-3 py-2"
                />
            </div>
            <div className="mb-4 blog-thumbnail h-[400px] overflow-hidden object-center rounded-md">
                <label htmlFor="blog-thumbnail" className="d-block">Thumbnail</label>
                <img className="rounded-md mt-2" src="https://images.unsplash.com/photo-1726607288637-a646ddd3814a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div className="flex items-center justify-between w-full mb-6">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="countries"
                    className="block mb-2 text-md font-normal text-gray-900"
                >
                    Publish status
                </label>
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 w-full"
                >
                    <option selected>Select status</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="conent"
                    className="block mb-2 text-md font-normal text-gray-900"
                >Content</label>
                <div className="border border-gray-600  rounded-md">
                    <Tiptap />
                </div>
            </div>

            <div>
                <button type="submit" className="bg-blue-700 p-4 text-md w-[100px] text-white">Create</button>
            </div>

        </>
    )
}