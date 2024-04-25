import { ActionPanel, List } from "@raycast/api";
import { TeamMember } from "../types";
import AddTeamMemberAction from "./AddTeamMemberAction";

function EmptyView(props: { teamMembers: TeamMember[]; searchText: string; onCreate: (member: TeamMember) => void }) {
  if (props.teamMembers.length > 0) {
    return (
      <List.EmptyView
        icon="🙅‍♀️"
        title="No team members found"
        description={`Can't find a team member matching ${props.searchText}.\nCreate it now!`}
        actions={
          <ActionPanel>
            <AddTeamMemberAction defaultTitle={props.searchText} onCreate={props.onCreate} />
          </ActionPanel>
        }
      />
    );
  }

  return null;
}

export default EmptyView;