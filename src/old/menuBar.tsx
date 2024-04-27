import { MenuBarExtra, open } from "@raycast/api";
import { team, getSlackUserLink } from "../team";

export default function Command() {
  return (
    <MenuBarExtra icon="🌐">
      <MenuBarExtra.Section title="Team">
        {team.map((item) => {
          const time = new Date().toLocaleString(undefined, { timeZone: item.timeZone, timeStyle: "short" });
          const title = `${item.name} - ${time}`;
          const userSlackUrl = getSlackUserLink(item.slackUserId);
          return (
            <MenuBarExtra.Item icon={item.flag} key={item.name} title={title} onAction={() => open(userSlackUrl)} />
          );
        })}
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
