import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  //callbacks to actually connect to the Database
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      //update session id.
      session.user.id = sessionUser._id.toString();
      //we are updating it to make sure we always know which user is cureently online.
      return session;
    },

    async signIn({ profile }) {
      console.log("This is the profile: ", profile);
      try {
        await connectDB();
        //check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        //if not create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("error checking if user exists..", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
