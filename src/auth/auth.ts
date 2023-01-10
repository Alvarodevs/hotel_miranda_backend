import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { IUserLogin } from '../interfaces/IUserLogin';
import {connection} from '../mongoConnection'
import { IUser } from '../interfaces';
import { User } from '../schemas';
import bcrypt from 'bcrypt';
import passCrypt from '../utils/passCrypt';

const localStrategy = passportLocal.Strategy
const JWTStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

//this is middleware to verify with user/email, will be used in login controller called by "post" route

passport.use(
   "login",
   new localStrategy(
      {
         usernameField: "email",
         passwordField: "password",
      }, 
			async (email: string, password: string, done) => {
				
				await connection();

				try {
					//getter user by email & comparing password by bcrypt.compare
					const currentUser = await User.findOne({ "email": email }).exec();
					
					if (!currentUser){
						done(new Error("Please check your credentials"))
					} 

					const passwordIsCorrect = await bcrypt.compare(
                  password,
                  currentUser.password
               );
					
					if (!passwordIsCorrect){
						if(email === process.env.PUBLIC_EMAIL && password === process.env.PUBLIC_PASSWORD){
							const user: IUserLogin = {
								_id: 0, 
								email: process.env.PUBLIC_EMAIL
							}
							return done(null, user, { message: "User logged in" });
						} else {
						return done(
                     new Error("Please check your credentials"),
                     false,
                     { message: "Please check your credentials" }
                  );
						}
					} else {
						return done(null, {_id: currentUser._id, email: currentUser.email}, { message: "User logged in" });
					}
				} catch (error){
					console.log(error)
					return done(error)
				}
			}
   )
);


//With JWT
passport.use(
   new JWTStrategy(
      {
         secretOrKey: "key",
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      (token, done) => {
         try {
            return done(null, token.user);
         } catch (error) {
            done(error);
         }
      }
   )
);