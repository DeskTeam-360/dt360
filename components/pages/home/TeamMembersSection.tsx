import { TeamMembers } from "@/components/pages/home/TeamMembers";
import { getHomeTeamMembers } from "@/lib/homeTeamMembers";

export async function TeamMembersSection() {
  const members = await getHomeTeamMembers();
  return <TeamMembers members={members} />;
}
