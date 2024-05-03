import { Action, Icon } from "@raycast/api";
import AddTeamMemberForm from "../forms/AddTeamMemberForm";
import { TeamMember } from "../../types";

function AddTeamMemberAction(props: { defaultTitle?: string; onCreate: (member: TeamMember) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Add New Team Member"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<AddTeamMemberForm defaultTitle={props.defaultTitle} onCreate={props.onCreate} />}
    />
  );
}

export default AddTeamMemberAction;
