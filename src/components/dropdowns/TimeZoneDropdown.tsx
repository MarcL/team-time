import { Form } from "@raycast/api";

function TimeZoneDropdown(props: { timezones: Array<string> | null, selected?: string }) {
  const defaultValue = props.selected || props.timezones?.[0];

  return (
    <Form.Dropdown id="timeZone" title="TimeZone" defaultValue={defaultValue}>
      {props.timezones?.map((timezone: string) => (
        <Form.Dropdown.Item key={timezone} value={timezone} title={timezone} />
      ))}
    </Form.Dropdown>
  );
}

export default TimeZoneDropdown;
