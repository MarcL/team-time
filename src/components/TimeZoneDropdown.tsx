import { ActionPanel, Form, Action } from "@raycast/api";

function TimeZoneDropdown() {
  // FIXME: TypeScript complains about Intl.supportedValuesOf
  // @ts-ignore
  const timeZones = Intl.supportedValuesOf('timeZone');
  return (
      <Form.Dropdown id="timeZone" title="TimeZone" defaultValue="Europe/London">
        {timeZones.map((timeZone: string) => (
            <Form.Dropdown.Item key={timeZone} value={timeZone} title={timeZone} />
        ))}
      </Form.Dropdown>
  );
}

export default TimeZoneDropdown;