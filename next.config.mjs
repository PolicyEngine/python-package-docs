/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/us/python-package" : "",
  output: "export",
};

export default nextConfig;
