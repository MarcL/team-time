import { Clipboard, environment, LaunchType, Toast, updateCommandMetadata } from "@raycast/api";

const command = async () => {
  const now = new Date();

  // Team time zones
  const timeZones = [
    { flag: "🇮🇱", timeZone: "Israel" },
    { flag: "🇬🇧", timeZone: "Europe/London" },
    { flag: "🇵🇱", timeZone: "Poland" },
    { flag: "🇨🇦", timeZone: "Canada/Eastern" },
    { flag: "🇺🇸", timeZone: "America/Chicago" },
  ];

  const subtitle = timeZones
    .map(({ flag, timeZone }) => {
      const time = now.toLocaleString(undefined, { timeZone, timeStyle: "short" });
      return `${flag} - ${time}`;
    })
    .join(" | ");

  await updateCommandMetadata({ subtitle });

  if (environment.launchType === LaunchType.UserInitiated) {
    const toast = new Toast({
      style: Toast.Style.Success,
      title: "Refreshed!",
      message: subtitle,
    });

    toast.primaryAction = {
      title: "Copy to Clipboard",
      shortcut: { modifiers: ["cmd", "shift"], key: "c" },
      onAction: () => Clipboard.copy(subtitle),
    };
    await toast.show();
  }
};

export default command;
