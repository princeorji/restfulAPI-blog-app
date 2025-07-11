const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt')

const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const accessToken = generateToken({ id: user.id, email: user.email })

        res.cookie('accessToken', accessToken, {
            maxAge: 6000 * 60 * 10,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })

        res.status(200).json({ message: 'Login successful', accessToken })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('accessToken')
    res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = router