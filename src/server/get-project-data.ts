import { db, getDownloadURLFromPath } from "@/lib/firebase";
import type { ProjectData } from "./get-profile-data";

export async function getProjectData(profileId: string, projectId: string) {
  const doc = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .get();

  if (!doc.exists) return null;

  const data = doc.data();
  if (!data) return null;

  let thumbnail = data.thumbnail;
  
  // Se thumbnail não for URL http, assume que é path do storage
  if (thumbnail && !thumbnail.startsWith("http")) {
      try {
          thumbnail = await getDownloadURLFromPath(thumbnail);
      } catch (e) {
          console.error("Error fetching thumbnail URL", e);
          // Fallback ou manter path original se falhar
      }
  }

  return {
    id: doc.id,
    ...data,
    thumbnail,
  } as ProjectData;
}

