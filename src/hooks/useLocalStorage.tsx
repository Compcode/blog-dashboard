import { useEffect, useState } from "react";
import type { Blog } from "../components/BlogList";

export const useLocalStorage = (key : string, initialValue : Blog[]) => {
    const [storedBlog, setStoredBlog] = useState<Blog[]>(() => {
        const blog = localStorage.getItem(key)
        return blog ? JSON.parse(blog) : initialValue
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedBlog))
        }
        catch(err) {
            console.error("Error saving to localStorage", err)
        }
    }, [key, storedBlog])

    return [storedBlog, setStoredBlog] as const
}