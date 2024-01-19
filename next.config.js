// next.config.js
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
	exportPathMap: async function () {
		return {
			"/": { page: "/" },
			"/gallery": { page: "/gallery" },
			"/admin": { page: "/admin" },
			"/contacts": { page: "/contacts" },
			"/about-me": { page: "/about-me" },
		};
	},
};

export default nextConfig;
