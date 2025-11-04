import TopbarMenuModal, {
  type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";

import ReactMarkdown from "react-markdown";
import md from "./info.md";

const InfoModal = ({ ...restProps }: TopbarMenuModalProps) => {
  return (
    <TopbarMenuModal {...restProps}>
      <div className="md-container | prose prose-slate">
        <ReactMarkdown children={md} />
      </div>
    </TopbarMenuModal>
  );
};

export default InfoModal;
