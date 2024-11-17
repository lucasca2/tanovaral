import {
  Wrapper,
  LogsList,
  Header,
  Line,
  Title,
} from "@/features/Logs/Logs.styles";

import { EmptyState } from "@/features/Logs/components/EmptyState/EmptyState";
import { Log } from "@/features/Logs/components/Log/Log";
import { useLogs } from "@/features/Logs/providers/useLogs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Logs = () => {
  const { logs, isEmpty } = useLogs();
  const { bottom } = useSafeAreaInsets();

  return (
    <Wrapper>
      <Header>
        <Line />
        <Title>Histórico</Title>
        <Line />
      </Header>

      <LogsList
        safeBottom={bottom}
        data={logs}
        renderItem={({ item }) => <Log type={item.type} date={item.date} />}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        ListEmptyComponent={isEmpty ? <EmptyState /> : null}
      />
    </Wrapper>
  );
};
