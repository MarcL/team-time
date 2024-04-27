import { Form } from "@raycast/api";
// @ts-ignore - TODO: Fix lack of types for country-flag-emoji
import countryFlagEmoji from 'country-flag-emoji';

function FlagEmojiDropdown() {
  const countries = Object.keys(countryFlagEmoji.data).map((countryCode) => {
    const country = countryFlagEmoji.data[countryCode];
    return {
      text: `${country.emoji} ${country.name}`,
      emoji: country.emoji,
    };
  });
  
  return (
      <Form.Dropdown id="flag" title="Flag">
        {countries.map((countryInfo) => (
            <Form.Dropdown.Item key={countryInfo.emoji} value={countryInfo.emoji} title={countryInfo.text} />
        ))}
      </Form.Dropdown>
  );
}

export default FlagEmojiDropdown;

