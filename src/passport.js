import passport from "passport";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  googleLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://agile-headland-94108.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://agile-headland-94108.herokuapp.com${routes.googleCallback}`
        : `http://localhost:4000${routes.googleCallback}`,
    },
    googleLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KK_ID,
      clientSecret: process.env.KK_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://agile-headland-94108.herokuapp.com${routes.kakaoCallback}`
        : `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
