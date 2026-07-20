/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirect the manifest to Farcaster's hosted-manifest service once you
  // generate one in the Farcaster web Developer Tools. Until then this repo
  // serves the static file at public/.well-known/farcaster.json.
  //
  // async redirects() {
  //   return [
  //     {
  //       source: "/.well-known/farcaster.json",
  //       destination: "https://api.farcaster.xyz/miniapps/hosted-manifest/YOUR_ID",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
