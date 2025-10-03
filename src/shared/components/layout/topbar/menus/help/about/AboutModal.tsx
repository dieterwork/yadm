import DEMOModal, {
  type DEMOModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import ReactMarkdown from "react-markdown";
import md from "./about.md";

const AboutModal = ({ ...restProps }: DEMOModalProps) => {
  return (
    <DEMOModal {...restProps}>
      <ReactMarkdown
        // Pass it as children
        children={md}
      />
    </DEMOModal>
  );
};

export default AboutModal;
