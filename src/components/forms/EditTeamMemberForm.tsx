import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import { TeamMember } from "../../types";
import TimeZoneDropdown from "../dropdowns/TimeZoneDropdown";
import CountryDropdown from "../dropdowns/CountryDropdown";

function EditTeamMemberForm(props: { teamMember: TeamMember, onUpdate: (member: TeamMember) => void }) {
  const { onUpdate, teamMember } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { name: string; timeZone: string; flag: string }) => {
      const { name, timeZone, flag } = values;
      
      onUpdate({ id: teamMember.id, name, flag, timeZone });
      
      pop();
    },
    [onUpdate, pop],
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Edit Team Member" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Name" defaultValue={teamMember.name} />
      <TimeZoneDropdown selected={teamMember.timeZone}/>
      <CountryDropdown selected={teamMember.flag}/>
    </Form>
  );
}

export default EditTeamMemberForm;
