import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/*", "/api/general/*", "/api/blog/*"],
      disallow: "/private/",
    },
    sitemap: "https://og.awandri.com/sitemap.xml",
  };
}
