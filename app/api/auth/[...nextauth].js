import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
    GoogleProvider({
        clientId: '197998897092-qagliaukoha09ruuvjvae6q1gmb0b515.apps.googleusercontent.com',
        clientSecret: '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',
      }),
    ]
})