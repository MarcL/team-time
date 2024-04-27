import { useCallback } from "react";
import { nanoid } from "nanoid";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import { TeamMember } from "../types";
import TimeZoneDropdown from "./TimeZoneDropdown";
import FlagEmojiDropdown from "./FlagEmojiDropdown";

function AddTeamMemberForm(props: { defaultTitle?: string; onCreate: (member: TeamMember) => void }) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { name: string; timeZone: string; flag: string }) => {
      const { name, timeZone, flag } = values;
      onCreate({ id: nanoid(), name, flag, timeZone });
      pop();
    },
    [onCreate, pop],
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Team Member" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" defaultValue={defaultTitle} title="Name" />
      <TimeZoneDropdown />
      <FlagEmojiDropdown />
    </Form>
  );
}

export default AddTeamMemberForm;
