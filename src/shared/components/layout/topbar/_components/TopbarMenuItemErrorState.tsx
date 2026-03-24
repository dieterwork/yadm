import { Button, type PressEvent } from "react-aria-components";

type Props = {
  message?: string;
  onAction?: (e: PressEvent) => void;
  actionText?: string;
};

const TopbarMenuItemErrorState = ({ message, onAction, actionText }: Props) => {
  return (
    <div>
      <p>{message}</p>
      <Button onPress={onAction}>{actionText}</Button>
    </div>
  );
};

export default TopbarMenuItemErrorState;
