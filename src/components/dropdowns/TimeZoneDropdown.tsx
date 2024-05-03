import { Form } from "@raycast/api";

function TimeZoneDropdown(props: { selected?: string }) {
  const timeZones = Intl.supportedValuesOf("timeZone");

  const defaultValue = props.selected || "Europe/London";

  return (
    <Form.Dropdown id="timeZone" title="TimeZone" defaultValue={defaultValue}>
      {timeZones.map((timeZone: string) => (
        <Form.Dropdown.Item key={timeZone} value={timeZone} title={timeZone} />
      ))}
    </Form.Dropdown>
  );
}

export default TimeZoneDropdown;
