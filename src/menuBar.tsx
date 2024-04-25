import { Icon, MenuBarExtra, open } from "@raycast/api";
import team from './team';

const slackTeamId = 'T02UKDKNA';
const slackTeamDeepLink = `slack://user?team=${slackTeamId}&id=`;
    
export default function Command() {
  return (
    <MenuBarExtra icon='🌐'>
      <MenuBarExtra.Section title="Team">
        {team.map((timezone) => {
            const time = new Date().toLocaleString(undefined, { timeZone: timezone.timeZone, timeStyle: "short" });
            const title = `${timezone.name} - ${time}`;
            return (
                <MenuBarExtra.Item icon={timezone.flag} key={timezone.name} title={title} onAction={() => open(`${slackTeamDeepLink}${timezone.slackUserId}`)} />
            );
        }
        )}
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
