import { User } from '@prisma/client';

export function userResponse(data: User) {
    delete data.password;
    return data;
}
