const config = {
  env: {
    apiEndpoint:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!
        : process.env.NEXT_PUBLIC_API_ENDPOINT!,

    //New Commit for comment
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IK_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IK_URL_ENDPOINT!,
      privateKey: process.env.IK_PRIVATE_KEY!,
    },
    database: {
      databaseUrl: process.env.DATABASE_URL!,
    },
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL,
      redisToken: process.env.UPSTASH_REDIS_TOKEN,
      qstashurl: process.env.QSTASH_URL,
      qstashtoken: process.env.QSTASH_TOKEN,
    },
    resend: {
      resendToken: process.env.RESEND_TOKEN,
    },
  },
};
export default config;