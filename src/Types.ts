export interface BlogTypes {
    id: number,
    title: string,
    slug: string,
    content: string,
    author: string,
    created_at: string,
    thumbnail: string
}

export interface Authentication {
    email: string,
    password: string

}


export interface AddBlog {
    title: string,
    thumbnail: null | string,
    content: string,
    status: string
}