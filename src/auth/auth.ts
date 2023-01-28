import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { IUserLogin } from '../interfaces/IUserLogin';
import { dbQuery } from '../databaseConnection';

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
      async (email, password, done) => {
         try {
            const user = await dbQuery('SELECT * FROM users WHERE email = ? AND password = ?;', [email, password])
                  .then(user => user)
            console.log(user);
            if (!user) {
               if(email === process.env.PUBLIC_EMAIL && password === process.env.PUBLIC_PASSWORD) {
                  const user = {
                     id: 1,
                     email: process.env.PUBLIC_EMAIL
                  }
                  return done(null, user, { message: "User logged in" });
               } else {
                  return done(null, false, { message: "Please check your credentials" })
               }
            } else {   
               return done(null, {id: user.id, email: user.email}, { message: "User logged in" });
            } 
            //else return done(null, false, { message: "Please check your credentials" });
         }
          catch (error) {
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