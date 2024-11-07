import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../db/client";
// Ensure your Prisma client is set up

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // Create user if doesn't exist
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: email,
              image: profile.photos[0].value,
              provider: "Google",
            },
          });
        }

        // Pass the user to the next step
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
