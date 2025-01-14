const config = {
  env: {
    apiEndpoint: {
      apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
    },
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
    },
  },
};
export default config;