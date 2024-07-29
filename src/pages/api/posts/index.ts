import { getPosts } from '@/apis/posts/getPosts'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await getPosts(req, res)
    } else if (req.method === 'POST') {
        const { title, content, authorIdx } = req.body

        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorIdx,
                },
            })

            res.status(201).json({ status: 'success', id: post.idx })
        } catch (error) {
            console.error('Error creating post:', error)
            res.status(500).json({ error: 'Server Error' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ error: `Method ${req.method} not allowed` })
    }
}

export default handler
