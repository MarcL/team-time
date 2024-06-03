import { Form } from "@raycast/api";
import countryFlagEmoji from "country-flag-emoji";

function CountryDropdown(props: { selected?: string, onChange: (value: {code: string; unicode: string; name: string; emoji: string;}) => void}) {
  console.log(countryFlagEmoji.data['GB']);
  const countries = Object.keys(countryFlagEmoji.data).map((countryCode) => {
    const country = countryFlagEmoji.data[countryCode];
    return {
      text: `${country.emoji} ${country.name}`,
      emoji: country.emoji,
      countryCode,
    };
  });

  const defaultValue = props.selected || "GB";

  return (
    <Form.Dropdown id="flag" title="Flag" defaultValue={defaultValue} onChange={(countryCode: string) => props.onChange(countryFlagEmoji.data[countryCode])}>
      {countries.map((countryInfo) => (
        <Form.Dropdown.Item key={countryInfo.emoji} value={countryInfo.countryCode} title={countryInfo.text} />
      ))}
    </Form.Dropdown>
  );
}

export default CountryDropdown;
