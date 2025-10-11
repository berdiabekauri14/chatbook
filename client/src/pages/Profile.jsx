/* eslint-disable no-undef */
import { useState } from "react";
import useAuth from "../hooks/useAuth"
import { usePosts } from "../context/Postcontext";

export default function Profile() {
    const [likes, setLikes] = useState(0);

    const { user } = useAuth();

    const { posts, deletePost, updatePost, addPost } = usePosts();

    const handleCreatePost = e => {
        const description = e.target.form.description.value;

        alert("Post was created!")
        
        localStorage.setItem("Post description", description)
    }

    const likePostIncrease = () => {
        if (likes === 1) {
            setLikes(likes)
        } else {
            setLikes(likes + 1)
        }
        
    }

    const likePostDecrease = () => {
        if (likes === 0) {
            setLikes(likes)
        } else {
            setLikes(likes - 1)
        }
        
    }

    const html = (
        <>
            <h1>{localStorage.getItem("Post description")}</h1>
            <br />
            <p>Likes: {likes}</p>
            <br />
            <button onClick={likePostIncrease} className=" m-3 border-2 p-2 cursor-pointer">👍</button>
            <button onClick={likePostDecrease} className=" m-3 border-2 p-2 cursor-pointer">👎</button>
            <br />
            <button onClick={deletePost} className=" m-3 p-2 cursor-pointer border-2 border-red-600">Delete post</button>
        </>
    )

    return (
        <div>
            <h1 className=" text-4xl">Profile</h1>
            <br />
            <h3>{user.fullname}</h3>
            <br />
            <h2 className=" text-3xl">Create post:</h2>
            <br />
            <form name="form">
                <textarea name="description" placeholder="Enter a description here" className=" border-2 rounded outline-0 p-3 m-3" required></textarea>
                <br />
                <button className=" border-2 p-3 rounded cursor-pointer" onClick={handleCreatePost} onChange={addPost}>Create post</button>
            </form>
            <br />
            {
                localStorage.getItem("Post description") !== "" ? html : <></>
            }
            {
                !posts ? 'No Posts Found' : posts.map(post => {
                    return (
                        <li key={post._id}>
                            <p>Created By: {post.fullname}</p>

                            {
                                updateToggle ? (
                                    <form>
                                        <div>
                                            <label htmlFor="title">Post title: </label>
                                            <input type="text" id="title" placeholder="Enter a title" defaultValue={post.title} />
                                            <br />
                                            <label htmlFor="Content">Content: </label>
                                            <input type="text" id="Content" placeholder="Enter content" defaultValue={post.content} />
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h3>{post.title}</h3>
                                        <p>Content: {post.content}</p>
                                        <br />
                                        <button onClick={deletePost}>Delete</button>
                                        <button onClick={updatePost}>Update</button>
                                    </>
                                )
                            }
                        </li>
                    )
                })
            }
        </div>
    )
}