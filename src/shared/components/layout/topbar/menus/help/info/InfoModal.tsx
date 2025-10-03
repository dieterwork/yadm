import DEMOModal, {
  type DEMOModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";

import ReactMarkdown from "react-markdown";
import md from "./info.md";

const InfoModal = ({ ...restProps }: DEMOModalProps) => {
  return (
    <DEMOModal {...restProps}>
      <ReactMarkdown children={md} />
    </DEMOModal>
  );
};

export default InfoModal;
