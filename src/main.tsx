import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { TeamMember } from "./types";
import { EmptyView } from "./components";
import { team } from './team';
import AddTeamMemberAction from "./components/AddTeamMemberAction";

type State = {
    isLoading: boolean;
    searchText: string;
    teamMembers: TeamMember[];
};

const STORAGE_KEY = "team-members";

export default function Command() {
  const [state, setState] = useState<State>({
    isLoading: false,
    searchText: "",
    teamMembers: []
  });

  // Load from async storage
  useEffect(() => {
    (async () => {
      const storedTeamMembers = await LocalStorage.getItem<string>(STORAGE_KEY);

      if (!storedTeamMembers) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const teamMembers: TeamMember[] = JSON.parse(storedTeamMembers);
        setState((previous) => ({ ...previous, teamMembers, isLoading: false }));
      } catch (e) {
        // can't decode teamMembers
        setState((previous) => ({ ...previous, teamMembers: [], isLoading: false }));
      }
    })();
  }, []);

    // Save to local storage
  useEffect(() => {
    LocalStorage.setItem(STORAGE_KEY, JSON.stringify(state.teamMembers));
  }, [state.teamMembers]);

  const handleCreate = useCallback(
    (member: TeamMember) => {
      const { name, timeZone, slackUserId, flag } = member;
      const newTeamMembers: TeamMember[] = [...state.teamMembers, { name, flag, timeZone, slackUserId }];

      console.log(newTeamMembers);
      setState((previous) => ({ ...previous, teamMembers: newTeamMembers, searchText: "" }));
    },
    [state.teamMembers, setState]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newTeamMembers = [...state.teamMembers];
      newTeamMembers.splice(index, 1);
      setState((previous) => ({ ...previous, todos: newTeamMembers }));
    },
    [state.teamMembers, setState]
  );

  return (
    <List
      isLoading={state.isLoading}
      searchText={state.searchText}
    >
      <EmptyView teamMembers={team} searchText={state.searchText} onCreate={handleCreate} />
      {state.teamMembers.map((member, index) => (
        <List.Item
          key={member.name}
          title={member.name}
          icon={member.flag}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <AddTeamMemberAction onCreate={handleCreate} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}