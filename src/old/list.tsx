import { Action, ActionPanel, List, open } from "@raycast/api";
import { team, getSlackUserLink } from "../team";

export default function Command() {
  return (
    <List navigationTitle="Search team" searchBarPlaceholder="Search team members by name">
      {team.map((item) => {
        const time = new Date().toLocaleString(undefined, { timeZone: item.timeZone, timeStyle: "short" });
        const title = `${item.name} - ${time}`;
        const userSlackUrl = getSlackUserLink(item.slackUserId);

        return (
          <List.Item
            key={item.name}
            title={title}
            icon={item.flag}
            actions={
              <ActionPanel>
                <Action title="Select" onAction={() => open(userSlackUrl)} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
