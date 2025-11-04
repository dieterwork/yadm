import TopbarMenuModal, {
  type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import ReactMarkdown from "react-markdown";
import md from "./about.md";

const AboutModal = ({ ...restProps }: TopbarMenuModalProps) => {
  return (
    <TopbarMenuModal {...restProps}>
      <div className="md-container | prose prose-slate">
        <ReactMarkdown children={md} />
      </div>
    </TopbarMenuModal>
  );
};

export default AboutModal;
