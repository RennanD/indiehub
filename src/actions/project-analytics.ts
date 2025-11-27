import { db } from "@/lib/firebase";

type LinkEvent = {
  shortLinkId: string;
  source: string;
  timestamp: number;
  userAgent: string;
  userAgentReadable: string;
  ip: string;
  location: string;
  referer: string;
};

export async function getProjectAnalytics(
  profileId: string,
  projectId: string,
) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId)
    .collection("link_events")
    .get();

  const events = snapshot.docs.map((doc) => doc.data());

  return events as LinkEvent[];

  // // Formatar para o gráfico
  // return Object.entries(sourceCount)
  //   .map(([source, count]) => ({
  //     source,
  //     visitors: count,
  //     fill: COLORS[source as keyof typeof COLORS],
  //   }))
  //   .sort((a, b) => b.visitors - a.visitors);
}
