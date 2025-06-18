import bcrypt from 'bcryptjs'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import  User from '../Model/User.Model';

const JWT_SECRET = process.env.JWT_SECRET
interface IUserObj{
    id: string;
    username: string;

}

const createToken=(user: IUserObj): string =>{
    const token=jwt.sign({user},JWT_SECRET as string, {
        expiresIn: '1h'}
    )

    return token;
}

const verifyToken = (token: string): { valid: boolean; payload?: any; error?: string } => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    console.log(decoded)
    return { valid: true, payload: decoded };
  } catch (err: any) {
    return { valid: false, error: err.message };
  }
};


export const SignUp=async(req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
        
        const {username,email,password}=req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser=await User.findOne({
            $or:[
                {username},
                {
                email
                }
            ]
        })
        if(existingUser){
            return res.status(400).json({error: "User already exists with this details"});
        }

        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password,salt)

        const user=await User.create({
            username,
            email,
            password:hashedPassword
        })
        await user.save()
        const token=createToken({id:user._id,username:user.username});

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:60*60,  // 1 hour
            secure:true
            
        });

        const userWithoutPassword = await User.findById(user._id).select("-password");
        return res.status(201).json({
            user: userWithoutPassword,
            token,
            message:"User created Successfully"
        })
    } catch (error: unknown) {
        let msg="unknown error occurred"
        if(error instanceof mongoose.Error){
            msg=error.message
        }
        return res.status(400).json({
            error:msg
        })
    }
}


export const Login=async (req: Request,res:Response): Promise<Response<any, Record<string, any>>> => {
    try {
        
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user=await User.findOne({
            email
        })
        if(!user){
            return res.status(404).json({error: "User does not exist with this email"});
        }
        let isPasswordValid=false
        if(user.password){
            isPasswordValid=await bcrypt.compare(password,user.password)
        }

        if(!isPasswordValid){
            return res.status(400).json({error: "Password is incorrect"});
        }

        const token=createToken({id:user._id,username:user.username});

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            maxAge:60*60  // 1 hour
        });

        return res.status(200).json({
            user,
            token,
            message: "Login successful"
        });
    } catch (error: unknown) {
        let msg="unknown error occurred"
        if(error instanceof mongoose.Error){
            msg=error.message
        }
        return res.status(400).json({
            error:msg
        })
    }
}

export const Logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({ error: "No token found to logout." });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Set to true in production with HTTPS
      sameSite: "strict", // helps with CSRF protection
      path: "/" // clear cookie for entire site
    });

    return res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (error: unknown) {
    let msg = "Unknown error occurred";
    if (error instanceof mongoose.Error || error instanceof Error) {
      msg = error.message;
    }

    return res.status(500).json({
      error: msg
    });
  }
};

export const validate = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  const { valid, payload, error } = verifyToken(token);

  if (!valid) {
    return res.status(401).json({ error: error || "Token is invalid or expired" });
  }

  return res.status(200).json({
    message: "Token is valid",
    user: payload.user, // since you signed as { user: { id, username } }
  });
};
