import { type IUser } from '@/interfaces/user.interface';

export interface IAuth {
     isAuth: IUser;
     error: string | null;
}
