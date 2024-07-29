import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const updateUsers = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { idx } = req.query
        const { email, name, nickname } = req.body

        const user = await prisma.user.update({
            where: { idx: Number(idx) },
            data: { email, name, nickname },
        })

        if (!user) {
            return res
                .status(404)
                .json({ status: 'error', message: 'User not found' })
        }

        res.status(200).json({ status: 'success', message: user })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        })
    }
}
