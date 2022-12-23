import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { IUserLogin } from '../interfaces/userLogin';

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
      }, (email, password, done) => {
         try {
            if (email === 'alvaro@example.com' && password === '1234') {
					const user: IUserLogin = {
						id: 0,
						email: email
					}
               return done(null, user, { message: "User logged in" });
            } else return done(null, false, { message: "Please check your credentials" });

         } catch (error) {
            return done(error);
         }
      }
   )
);


//With JWT
passport.use(new JWTStrategy({
	secretOrKey: "key",
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (token, done) => {
	try {
		return done(null, token.user)
	} catch (error) {
		done(error)
	}})
);