import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, List, LocalStorage, Icon } from "@raycast/api";
import { TeamMember } from "./types";
import { EmptyView } from "./components";
import { team } from './team';
import { AddTeamMemberAction, DeleteTeamMemberAction } from "./components";

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
    (async () => {
      await LocalStorage.setItem(STORAGE_KEY, JSON.stringify(state.teamMembers));
    })();
  }, [state.teamMembers]);

  const handleCreate = useCallback(
    (member: TeamMember) => {
      const { name, timeZone, slackUserId, flag } = member;
      const newTeamMembers: TeamMember[] = [...state.teamMembers, { id: nanoid(), name, flag, timeZone, slackUserId }];

      setState((previous) => ({ ...previous, teamMembers: newTeamMembers, searchText: "" }));
    },
    [state.teamMembers, setState]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newTeamMembers = [...state.teamMembers];
      newTeamMembers.splice(index, 1);
      setState((previous) => ({ ...previous, teamMembers: newTeamMembers }));
    },
    [state.teamMembers, setState]
  );

  return (
    // TODO: Add onSearchTextChange
    <List
      isLoading={state.isLoading}
      searchText={state.searchText}
    >
      <EmptyView teamMembers={team} onCreate={handleCreate} />
      {state.teamMembers.map((member, index) => {
          const time = new Date().toLocaleString(undefined, { timeZone: member.timeZone, timeStyle: "short" });
          return (
          <List.Item
            key={member.id}
            title={member.name}
            icon={member.flag}
            accessories={[{ text: time, icon: Icon.Clock }]}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <AddTeamMemberAction onCreate={handleCreate} />
                  <DeleteTeamMemberAction onDelete={() => handleDelete(index)} />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        )}
      )}
    </List>
  );
}