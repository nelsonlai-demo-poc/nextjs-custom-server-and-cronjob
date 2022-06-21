import User from '../entity/user';
import UserDTO from '../model/user-dto';
import { hashPassword, matchPassword } from '../util/password';
import jwt from 'jsonwebtoken';

export const register = async (
    username: string,
    password: string
): Promise<UserDTO> => {
    const check = await User.findOne({
        where: {
            username: username,
        },
    });

    if (check !== null) {
        throw 'User already exists';
    }

    const hash = await hashPassword(password);

    await User.create({
        username: username,
        password: hash,
    });

    const user = await User.findOne({
        where: {
            username: username,
        },
    });

    const dto = new UserDTO(
        user?.getDataValue('username'),
        user?.getDataValue('createdAt'),
        user?.getDataValue('updatedAt')
    );
    return dto;
};

export const login = async (
    username: string,
    password: string
): Promise<string> => {
    const user = await User.findOne({
        where: {
            username: username,
        },
    });

    if (user === null) {
        throw 'User not found';
    }

    const match = await matchPassword(password, user.getDataValue('password'));

    if (!match) {
        throw 'Password does not match';
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            id: user.getDataValue('id'),
            username: user.getDataValue('username'),
        },
        secret as string,
        { expiresIn: '1h' }
    );

    return token;
};
