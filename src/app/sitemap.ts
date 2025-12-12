import type { MetadataRoute } from "next";
import { getAllProfiles } from "@/actions/get-all-profiles";
import { CONSTANTS } from "@/shared/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles = await getAllProfiles();

  const profilesRoutes = profiles.map((profile) => ({
    url: `${CONSTANTS.basePath}/${profile.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${CONSTANTS.basePath}/`,
      lastModified: new Date(),
    },
    ...profilesRoutes,
  ];
}
