const posts = require("../data/posts.json")
const Post = require("../models/post.model.js")

const getPosts = (req, res) => {
    res.json(posts)
}

const getPost = (req, res) => {
    const postId = parseInt(req.params.id)
    const post = posts.find(el => el === postId * 1)

    if (post) {
        res.json(post)
    } else {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }
}

const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(403).json({
            status: "Something missing in process",
            message: "Title and content is required",
            error: 403
        })
    }

    const newPost = await Post.create(
        {
            title,
            content,
            likeCount: 0
        }
    )

    res.status(201).json(newPost);
}

const deletePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(el => el === postId * 1)

    if(postId === -1) {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }

    posts.splice(post, 1)

    res.json(posts)
}

const updatePost = (req, res) => {
    const postId = parseInt(req.params.id)
    const { title, content } = req.body;

    const post = posts.find(el => el === postId * 1)

    if (!post) {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }

    if(title) post.title = title
    if(content) post.content = content

    res.json(post)
}

module.exports = { getPosts, getPost, createPost, deletePost, updatePost }