export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  loading?: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type IUserSignup={
    username: string;
    email: string;
    password: string;
}

export type IUserLogin = {
    email: string;
    password: string;
};

