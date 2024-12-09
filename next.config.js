/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "res.cloudinary.com"]
    },
    webpack(config) {
        config.module.rules.push({
            test: /.+\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['next/babel'],
                    plugins: ['transform-remove-console'] // Remove console logs in production
                }
            },
            exclude: /node_modules/
        });

        return config;
    },
}

module.exports = nextConfig;
