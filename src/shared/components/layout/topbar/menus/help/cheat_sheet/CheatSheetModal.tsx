import DEMOModal, {
  type DEMOModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";

import ReactMarkdown from "react-markdown";
import md from "./cheat_sheet.md";

const CheatSheetModal = ({ ...restProps }: DEMOModalProps) => {
  return (
    <DEMOModal {...restProps}>
      <ReactMarkdown children={md} />
    </DEMOModal>
  );
};

export default CheatSheetModal;
