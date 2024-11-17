import {
  Wrapper,
  Text,
  Date,
  TShirtIcon,
  BasketIcon,
} from "@/features/Logs/components/Log/Log.styles";
import dayjs from "dayjs";

type LogProps = {
  type: "hangup" | "takedown";
  date: Date;
};

const TEXT_BY_TYPE = {
  hangup: "Estendido",
  takedown: "Recolhido",
};

const ICON_BY_TYPE = {
  hangup: TShirtIcon,
  takedown: BasketIcon,
};

export const Log = ({ type, date }: LogProps) => {
  const Icon = ICON_BY_TYPE[type];
  return (
    <Wrapper>
      <Icon />
      <Text>{TEXT_BY_TYPE[type]}</Text>
      <Date>{dayjs(date).format("DD/MM [às] HH:mm")}</Date>
    </Wrapper>
  );
};
