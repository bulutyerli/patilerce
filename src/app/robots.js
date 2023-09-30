export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/control-center/',
      disallow: '/messages/',
      disallow: '/profile/',
    },
    sitemap: 'https://tailwish.vercel.app/sitemap.xml',
  };
}
