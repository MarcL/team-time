import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";
import ct, { Country } from 'countries-and-timezones';
import { TeamMember } from "../../types";
import TimeZoneDropdown from "../dropdowns/TimeZoneDropdown";
import CountryDropdown from "../dropdowns/CountryDropdown";

function AddTeamMemberForm(props: { defaultTitle?: string; onCreate: (member: TeamMember) => void }) {
  const { onCreate, defaultTitle = "" } = props;
  const { pop } = useNavigation();
  const [country, setCountry] = useState<Country | null>(ct.getCountry('GB'));

  const handleSubmit = useCallback(
    (values: { name: string; timeZone: string; flag: string, countryCode: string }) => {
      const { name, timeZone, flag, countryCode } = values;
      onCreate({ id: nanoid(), name, flag, timeZone, countryCode });
      pop();
    },
    [onCreate, pop],
  );

  const handleChange = useCallback(
    (value: {code: string, unicode: string, name: string, emoji: string}) => {
      const country = ct.getCountry(value.code);
      setCountry(country);
    },
    [],
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
      <CountryDropdown onChange={handleChange}/>
      <TimeZoneDropdown timezones={country?.timezones || null} />
    </Form>
  );
}

export default AddTeamMemberForm;
