import type { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../backend/service/auth';

interface LoginRequest {
    username: string;
    password: string;
}

const handler = async (req: NextApiRequest, resp: NextApiResponse) => {
    if (req.method !== 'POST') {
        resp.status(405).end();
        return;
    }

    const { username, password } = req.body as LoginRequest;
    if (!username || username === '' || !password || password === '') {
        resp.status(200).end({
            code: -1,
            message: 'username or password is empty',
        });
        return;
    }

    try {
        const token = await login(username, password);
        resp.status(200).json({ code: 0, message: 'success', data: token });
    } catch (e) {
        resp.status(200).json({ code: -1, message: e });
    }
};

export default handler;
