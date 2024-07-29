import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { idx } = req.query

        await prisma.user.delete({
            where: { idx: Number(idx) },
        })

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        })
    }
}
