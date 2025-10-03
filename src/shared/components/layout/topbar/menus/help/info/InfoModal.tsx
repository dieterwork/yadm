import DEMOModal, {
  type DEMOModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";

const InfoModal = ({ ...restProps }: DEMOModalProps) => {
  return <DEMOModal {...restProps}>Info</DEMOModal>;
};

export default InfoModal;
