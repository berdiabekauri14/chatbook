/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import usePosts from "../hooks/usePosts";

export default function Pages() {
    const { posts, getPosts } = usePosts();

    useEffect(() => {
        getPosts(posts);
    }, []);

    return (
        <div>
            {posts}
        </div>
    );
}