import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idx } = req.query
    const idxStr = Array.isArray(idx) ? idx[0] : idx
    const id = Number(idxStr)

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' })
    }

    try {
        if (req.method === 'PUT') {
            const post = await prisma.post.update({
                where: { idx: id },
                data: req.body,
            })

            res.status(200).json({ status: 'success', id: post.idx })
        } else if (req.method === 'DELETE') {
            const post = await prisma.post.delete({
                where: { idx: id },
            })

            res.status(200).json({ status: 'success', id: post.idx })
        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' })
    }
}

export default handler
