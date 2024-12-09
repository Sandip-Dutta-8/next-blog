/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com", "res.cloudinary.com"]
    },
    reactStrictMode: true,
    pageExtensions: ['page.js', 'page.jsx'],
    async rewrites() {
        return [
            {
                source: '/write/:path*',
                destination: '/write', // Redirect to the client-side page
            },
        ];
    },
}

module.exports = nextConfig
