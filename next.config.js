/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  // webpack: (config) => {
  //   config.experiments = { topLevelAwait: true };
  //   return config;
  // },
  images: {
    domains: ["store.storeimages.cdn-apple.com","localhost"] 
  },
  env: {
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};
