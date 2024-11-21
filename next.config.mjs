const nextConfig = {
    images: {
        domains: [
            'img.freepik.com',
            'res.cloudinary.com',
            'images.pexels.com',
            'www.pexels.com',
            'amzirlodp-prd-s3.s3.amazonaws.com',
            't3.ftcdn.net',
            'upload.wikimedia.org',
            'www.nicepng.com'
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Fixes npm packages that depend on 'net' module
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false, // If you encounter any TLS issues, you can include this as well
                child_process: false,
                http2: false,
            };
        }

        return config;
    }
};

export default nextConfig;