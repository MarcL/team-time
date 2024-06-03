import { ActionPanel, List } from "@raycast/api";
import { TeamMember } from "../types";
import AddTeamMemberAction from "./actions/AddTeamMemberAction";

function EmptyView(props: { teamMembers: TeamMember[]; onCreate: (member: TeamMember) => void }) {
  if (props.teamMembers.length > 0) {
    return null;
  }

  return (
    <List.EmptyView
      icon="🙅‍♀️"
      title="No team members found"
      description={`No team members found.\nAdd one now!`}
      actions={
        <ActionPanel>
          <AddTeamMemberAction defaultTitle={"Name"} onCreate={props.onCreate} />
        </ActionPanel>
      }
    />
  );
}

export default EmptyView;
