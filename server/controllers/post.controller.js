const Post = require("../models/post.model.js")
const AppError = require("../utils/appError.js")
const catchAsync = require("../utils/catchAsync.js")

const getPosts = catchAsync(async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts);
})

const getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    if (post) {
        res.json(post)
    } else {
        return next(new AppError("Post not found", 404))
    }
})

const createPost = catchAsync(async (req, res) => {
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
})

const deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if(!post) {
        return next(new AppError("Post not found", 404))
    }

    res.status(204).send();
})

const updatePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const { title, content } = req.body;

    const post = await Post.findById(id);

    if (!post) {
        return next(new AppError("Post not found", 404))
    }

    if(title) post.title = title
    if(content) post.content = content

    await post.save()


    res.status(200).json(post)
})

module.exports = { getPosts, getPost, createPost, deletePost, updatePost }