import { Icon, MenuBarExtra, open } from "@raycast/api";

const slackTeamId = 'T02UKDKNA';
const slackTeamDeepLink = `slack://user?team=${slackTeamId}&id=`;

// Team time zones
const team = [
    { flag: '🇮🇱', timeZone: 'Israel', name: 'Elad', slackUserId: 'D06649W8G2C' },
    { flag: '🇬🇧', timeZone: 'Europe/London', name: 'Matt', slackUserId: 'D03JG0865BN'  },
    { flag: '🇬🇧', timeZone: 'Europe/London', name: 'Rob', slackUserId: 'D03GRQY79U6'  },
    { flag: '🇵🇱', timeZone: 'Poland', name: 'Michal', slackUserId: 'D04P3T943RN'  },
    { flag: '🇨🇦', timeZone: 'Canada/Eastern', name: 'Phil', slackUserId: 'D06NT0T129K'  },
    { flag: '🇨🇦', timeZone: 'Canada/Eastern', name: 'Mateusz', slackUserId: 'D06QH60KVCJ'  },
    { flag: '🇺🇸', timeZone: 'America/Chicago', name: 'Taty', slackUserId: 'D03TZPRD716'  },
];
    
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
