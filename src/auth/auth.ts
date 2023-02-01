import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { IUserLogin } from "../interfaces/IUserLogin";
import { dbQuery } from "../databaseConnection";

const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

//this is middleware to verify with user/email, will be used in login controller called by "post" route
passport.use(
   "login",
   new localStrategy(
      {
         usernameField: "email",
         passwordField: "password",
      },
      async (email: string, password: string, done) => {
         try {
            //const passCrypted = await bcrypt.compare(password, 10);

            const user: IUserLogin = await dbQuery(
               "SELECT * FROM users WHERE email = ?;",
               [email]
            ).then((user: IUserLogin): IUserLogin => user);

            const isCorrectPassword = await bcrypt.compare(password, user[0].password);
               
            if (!isCorrectPassword) {
               if (
                  email === process.env.PUBLIC_EMAIL &&
                  password === process.env.PUBLIC_PASSWORD
               ) {
                  const user = {
                     id: 1,
                     email: process.env.PUBLIC_EMAIL,
                  };
                  return done(null, user[0], { message: "User logged in" });
               } else {
                  return done(null, false, {
                     message: "Please check your credentials",
                  });
               }
            } else {
               return done(
                  null,
                  { id: user[0].id, email: user[0].email, name: user[0].name },
                  { message: "User logged in" }
               );
            }
            //else return done(null, false, { message: "Please check your credentials" });
         } catch (error) {
            return done(error);
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
