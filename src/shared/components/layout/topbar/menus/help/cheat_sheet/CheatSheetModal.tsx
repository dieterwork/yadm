import TopbarMenuModal, {
  type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";

import ReactMarkdown from "react-markdown";
import md from "./cheat_sheet.md";

const CheatSheetModal = ({ ...restProps }: TopbarMenuModalProps) => {
  return (
    <TopbarMenuModal {...restProps}>
      <ReactMarkdown children={md} />
    </TopbarMenuModal>
  );
};

export default CheatSheetModal;
