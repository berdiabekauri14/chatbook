import { useEffect, useState } from "react"

export default function Posts() {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = await fetch("https://dummyjson.com/posts/1")
                const result = await api.json()
                
                setData(result)
            } catch(err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    if (!data) {
        return <p>Loading data...</p>
    }    

    return (
        <div>
            <h1 className=" text-3xl">Posts</h1>
            <br />
            <div key={data.id}>
                <header>
                    <h1 className=" text-2xl">{data.title}</h1>
                    <br />
                    <p>{data.body}</p>
                </header>
                <br />
                <p>Likes: {data.reactions.likes}</p>
                <br />
                <p>Dislikes: {data.reactions.dislikes}</p>
                <br />
                <p>Views: {data.views}</p>
            </div>
        </div>
    )
}