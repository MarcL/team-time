import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import { TeamMember } from "../types";
import TimeZoneDropdown from "./TimeZoneDropdown";

function AddTeamMemberForm(props: { defaultTitle?: string; onCreate: (member: TeamMember) => void }) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { name: string; timeZone: string }) => {
      const flag = "🇺🇸"; // TODO: Get flag from country code / time zone
      onCreate({ name: values.name, flag, timeZone: values.timeZone });
      pop();
    },
    [onCreate, pop],
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add team member" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" defaultValue={defaultTitle} title="Name" />
      <TimeZoneDropdown />
    </Form>
  );
}

export default AddTeamMemberForm;
