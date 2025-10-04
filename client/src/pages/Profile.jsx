import { useState } from "react";

export default function Profile() {
    const [likes, setLikes] = useState(0)

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

    const deletePost = () => {
        alert("Post was deleted!")
        
        localStorage.clear()
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
            <h2 className=" text-3xl">Create post:</h2>
            <br />
            <form name="form">
                <textarea name="description" placeholder="Enter a description here" className=" border-2 rounded outline-0 p-3 m-3" required></textarea>
                <br />
                <button className=" border-2 p-3 rounded cursor-pointer" onClick={handleCreatePost}>Create post</button>
            </form>
            <br />
            {
                localStorage.getItem("Post description") !== "" ? html : <></>
            }
        </div>
    )
}