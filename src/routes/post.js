const express = require('express')
const Post = require('../models/post')
const protect = require('../middlewares/auth')

const router = express.Router()

router.post('/', protect, async (req, res) => {
    const { title, description, state, tags, body } = req.body

    try {
        const post =  await Post.create({
            title,
            description,
            state,
            tags,
            body,
            author: req.user.id
        })  
        res.status(201).json(post) 
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const { count: total, rows: posts} = await Post.findAndCountAll({
        where: { state: 'published' },
        offset,
        limit
    })
    res.status(200).json({ posts, page, limit, total })
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.patch('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        await post.update(req.body)
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.delete('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        await post.destroy()
        res.sendStatus(200)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router