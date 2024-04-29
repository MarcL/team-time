import { Form } from "@raycast/api";
import countryFlagEmoji from "country-flag-emoji";

function FlagEmojiDropdown(props: { selected?: string }) {
  const countries = Object.keys(countryFlagEmoji.data).map((countryCode) => {
    const country = countryFlagEmoji.data[countryCode];
    return {
      text: `${country.emoji} ${country.name}`,
      emoji: country.emoji,
    };
  });

  const defaultValue = props.selected || "🇬🇧";

  return (
    <Form.Dropdown id="flag" title="Flag" defaultValue={defaultValue}>
      {countries.map((countryInfo) => (
        <Form.Dropdown.Item key={countryInfo.emoji} value={countryInfo.emoji} title={countryInfo.text} />
      ))}
    </Form.Dropdown>
  );
}

export default FlagEmojiDropdown;
