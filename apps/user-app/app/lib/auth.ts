import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import axios from "axios";
export const authOptions = {
    providers: [
    CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Name", type: "text", placeholder: "John Doe", required: true },
            phone: { label: "Phone number", type: "string", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-auth
          async authorize(credentials: any) {
            const res=await axios.post("https://otp.dev/api/verify/",{
                
            })
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                if(credentials.name.length ===0) {
                    throw new Error("Name must be atleast 1 character long");  
                }
                const user = await db.user.create({
                    data: {
                        name: credentials.name,
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
                await db.balance.create({
                    data: {
                        amount: 0,
                        userId: user.id,
                        locked: 0
                    }
                });
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    },
    pages: {
        signIn: '/login'
    }
  }
  