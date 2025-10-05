/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

const API_URL = 'http://localhost:3000/api';

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                credentials: 'include'
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            setPosts(result.data.posts);
        } catch(err) {
            console.log(err);
        }
    }

    const addPost = async (postData) => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(postData)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            setPosts(prevPosts => [result.data.post, ...prevPosts]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <PostContext.Provider value={{getPosts, addPost, posts}}>
            {children}
        </PostContext.Provider>
    )
}