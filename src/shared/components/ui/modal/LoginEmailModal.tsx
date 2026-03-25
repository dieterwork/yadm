import TopbarMenuModal, {
  type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import { Button, Input, Label, TextField } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import sendCodeToEmail from "$/features/auth/sendCodeToEmail";
import { useForm, type SubmitHandler } from "react-hook-form";
import verifyCode from "$/features/auth/verifyCode";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import useUserStore from "$/features/auth/useUserStore";
import z from "zod";

type Inputs = {
  email: string;
  code: string;
};

const LoginEmailModal = ({ ...restProps }: TopbarMenuModalProps) => {
  const { t } = useTranslation();

  const sendCodeMutation = useMutation({ mutationFn: sendCodeToEmail });
  const verifyCodeMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyCode(email, code),
    mutationKey: ["verify_code"],
    onSuccess: (data, variables, onMutateResult, context) => {
      console.log(data);
      setEmail(data.email);
      setAuthKey(data.authKey);
      // restProps.onOpenChange?.(false);
      // reset();
    },
  });

  const { user, setEmail, setAuthKey } = useUserStore();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const loginForm = useForm<Inputs>({
    defaultValues: { email: user.email ?? "" },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (sendCodeMutation.isSuccess) {
      verifyCodeMutation.mutate({ email: data.email, code: data.code });
    } else {
      sendCodeMutation.mutate(data.email);
    }
  };

  const reset = () => {
    sendCodeMutation.reset();
    verifyCodeMutation.reset();
    loginForm.reset();
  };

  return (
    <TopbarMenuModal
      {...restProps}
      onOpenChange={(isOpen) => {
        restProps.onOpenChange?.(isOpen);
        if (!isOpen) {
          reset();
        }
      }}
    >
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <section className="flex items-center justify-between">
          {!sendCodeMutation.isSuccess && (
            <TextField className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Label className="text-slate-900 text-xs">
                {t(($) => $["e-mail"])}
              </Label>
              <Input
                type="email"
                className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500 aria-invalid:border-rose-500"
                {...loginForm.register("email", { required: true })}
                aria-invalid={
                  loginForm.formState.errors.email || sendCodeMutation.isError
                    ? "true"
                    : "false"
                }
              />
              {loginForm.formState.errors.email && (
                <p role="alert">{loginForm.formState.errors.email.message}</p>
              )}
            </TextField>
          )}
          {sendCodeMutation.isSuccess && (
            <TextField className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Label className="text-slate-900 text-xs">
                {t(($) => $["code"])}
              </Label>
              <Input
                type="text"
                className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500 aria-invalid:border-rose-500"
                {...loginForm.register("code", { required: true })}
                aria-invalid={
                  loginForm.formState.errors.code || sendCodeMutation.isError
                    ? "true"
                    : "false"
                }
              />
              {loginForm.formState.errors.code && (
                <p role="alert">{loginForm.formState.errors.code.message}</p>
              )}
            </TextField>
          )}
          <Button
            type="submit"
            className="inline-flex items-center gap-2 cursor-pointer rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700"
          >
            Send
            {(sendCodeMutation.isPending || verifyCodeMutation.isPending) && (
              <CircleNotchIcon className="animate-spin" />
            )}
          </Button>
        </section>
        {sendCodeMutation.isError && (
          <p role="alert" className="text-rose-500 text-sm mt-5">
            {sendCodeMutation.error.message}
          </p>
        )}
      </form>
    </TopbarMenuModal>
  );
};

export default LoginEmailModal;
