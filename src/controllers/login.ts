import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
   passport.authenticate("login", (err, user, info) => {
		console.log('user', user)
		try {
			if(!user || err) {
				return next(new Error("Something went wrong"))
			}
			req.login(
				user, 
				{session: false}, 
				async (error) => {
					if (error) return next(error);
					res.json({"token": jwt.sign({user:{id: user.id, email: user.email}}, "key"), "user": {id: user.id, email: user.email, name: user.name}})
				}	
			)
		} catch (error) {
			return next(error);
		}
	})(req, res, next)
};
