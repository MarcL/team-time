interface TeamMember {
  id: string;
  name: string;
  flag: string;
  countryCode: string;
  timeZone: string;
  slackUserId?: string;
}

export type { TeamMember };
