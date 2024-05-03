import { Action, Icon } from "@raycast/api";
import EditTeamMemberForm from "../forms/EditTeamMemberForm";
import { TeamMember } from "../../types";

function EditTeamMemberAction(props: { teamMember: TeamMember; onUpdate: (member: TeamMember) => void }) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Edit Team Member"
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      target={<EditTeamMemberForm teamMember={props.teamMember} onUpdate={props.onUpdate} />}
    />
  );
}

export default EditTeamMemberAction;
