export interface PostInterface {
    id: string,
    user_id: {
        name: string,
        occupation: string
    }
    title: string,
    slug: string,
    body: string | null,
    created_at: string,
    updated_at: string,
    tags_id: {
        id: number,
        name: string
    },
    image_url: string | null,
    published: boolean
}