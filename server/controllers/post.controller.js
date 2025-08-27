const Post = require("../models/post.model.js")

const getPosts = async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts);
}

const getPost = async (req, res) => {
    const post = await Post.findById(req.params.id)

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

const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if(!post) {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }

    res.status(204).send();
}

const updatePost = async (req, res) => {
    const { id } = req.params;

    const { title, content } = req.body;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }

    if(title) post.title = title
    if(content) post.content = content

    await post.save()


    res.status(200).json(post)
}

module.exports = { getPosts, getPost, createPost, deletePost, updatePost }