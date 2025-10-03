import DEMOModal, {
  type DEMOModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";

const CheatSheetModal = ({ ...restProps }: DEMOModalProps) => {
  return <DEMOModal {...restProps}>Cheat sheet</DEMOModal>;
};

export default CheatSheetModal;
