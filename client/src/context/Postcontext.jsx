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

    const deletePost = async (postId) => {
        try {
            const res = await fetch(`${API_URL}/posts/${postId}`, {
                method: "DELETE",
                credentials: "include"
            })
    
            const result = await res.json()
    
            if (!res.ok) {
                throw new Error(result.message)
            }

            setPosts(posts.filter(post => post._id !== postId));

            alert("Post deleted succesfully")
        } catch(err) {
            console.log(`Error: ${err}`) 
        }  

    }

    const updatePost = async (data, postId) => {
        try {
            const res = await fetch(`${API_URL}/posts/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(),
                credentials: "include"
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message)
            }

            setPosts(posts.filter(post => post._id !== postId));

            alert("Post updated succesfully")
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    return (
        <PostContext.Provider value={{getPosts, addPost, deletePost, updatePost, posts}}>
            {children}
        </PostContext.Provider>
    )
}