import TopbarMenuModal, {
  type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import { Button, Input, Label, TextField } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { sha256 } from "js-sha256";
import useUserStore from "$/features/auth/useUserStore";
import { useForm, type SubmitHandler } from "react-hook-form";

interface FormInputs {
  password: string;
}

const ServerPasswordModal = ({
  onSubmit = () => {},
  ...restProps
}: TopbarMenuModalProps & {
  onSubmit?: SubmitHandler<FormInputs>;
}) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  return (
    <TopbarMenuModal {...restProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField className="grid grid-cols-[auto_1fr] items-center gap-2">
          <Label className="text-slate-900 text-xs">
            {t(($) => $["password"])}
          </Label>
          <Input
            type="password"
            {...register("password", { required: true })}
            className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500"
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </TextField>
        <Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700">
          Save
        </Button>
      </form>
    </TopbarMenuModal>
  );
};

export default ServerPasswordModal;
