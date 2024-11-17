import { Wrapper, TShirtDisabled, Message } from "./EmptyState.styles"

export const EmptyState = () => {
    return (
        <Wrapper>
            <TShirtDisabled />
            <Message>Sem histórico.</Message>
        </Wrapper>
    )
}