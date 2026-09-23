import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://robotecs.tech";
const paths = ["", "/about/", "/sponsors/", "/packages/", "/contact/", "/student/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${siteUrl}${path || "/"}` }));
}
