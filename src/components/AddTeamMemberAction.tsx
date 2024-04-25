import { Action, Icon } from "@raycast/api";
import AddTeamMemberForm from "./AddTeamMemberForm";
import { TeamMember } from "../types";

function AddTeamMemberAction(props: { defaultTitle?: string; onCreate: (member: TeamMember) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Add team member"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<AddTeamMemberForm defaultTitle={props.defaultTitle} onCreate={props.onCreate} />}
    />
  );
}

export default AddTeamMemberAction;