import TopbarMenuModal, {
  type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import { Button, Input, Label, TextField } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";
import useUserStore from "$/features/auth/useUserStore";
import { sha256 } from "js-sha256";
import { CircleNotchIcon } from "@phosphor-icons/react";

interface FormInputs {
  password: string;
}

const ServerPasswordModal = ({
  onSubmitCallback,
  isPending,
  errorMessage,
  ...restProps
}: TopbarMenuModalProps & {
  onSubmitCallback?: () => void;
  isPending?: boolean;
  errorMessage?: string;
}) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const { setPassword } = useUserStore();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setPassword(sha256(data.password));
    onSubmitCallback?.();
  };

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
        <Button
          type="submit"
          className="inline-flex items-center gap-2 cursor-pointer rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700"
        >
          Save
          {isPending && <CircleNotchIcon className="animate-spin" />}
        </Button>
        {errorMessage && <p role="alert">{errorMessage}</p>}
      </form>
    </TopbarMenuModal>
  );
};

export default ServerPasswordModal;
