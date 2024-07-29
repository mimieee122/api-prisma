import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const readUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { idx } = req.query

        const user = await prisma.user.findUnique({
            where: { idx: Number(idx) },
        })

        if (!user) {
            return res
                .status(404)
                .json({ status: 'error', message: 'User not found' })
        }

        res.status(200).json({ status: 'success', data: user })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        })
    }
}
