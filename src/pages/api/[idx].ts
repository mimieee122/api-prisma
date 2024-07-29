import { readUser } from '@/apis/users/readUser'
import { deleteUser } from '@/apis/users/deleteUser'
import { updateUsers } from '@/apis/users/updateUsers'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // ctrl + alt + L
    const { idx } = req.query
    // console.log('🚀 ~ handler ~ req.query:', req.query)

    // res.status(200).json({
    //     message: 'ok',
    // })
    const userId = Number(idx)

    switch (req.method) {
        case 'GET':
            await readUser(req, res)
            break
        case 'PUT':
            await updateUsers(req, res)
            break
        case 'DELETE':
            await deleteUser(req, res)
            break
    }
}
export default handler
