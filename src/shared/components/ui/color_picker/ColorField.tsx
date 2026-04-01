import {
  ColorField as AriaColorField,
  FieldError,
  Input,
  Label,
  type ColorFieldProps as AriaColorFieldProps,
  type ValidationResult,
} from "react-aria-components";
import { cn, tv } from "tailwind-variants";

const inputStyles = tv({
  base: "border-1 rounded-lg min-h-9 font-sans text-sm py-0 px-3 box-border transition [-webkit-tap-highlight-color:transparent]",
});

export interface ColorFieldProps extends AriaColorFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function ColorField({
  label,
  description,
  errorMessage,
  ...props
}: ColorFieldProps) {
  return (
    <AriaColorField
      {...props}
      className={cn(props.className, "flex flex-col gap-1 font-sans")}
    >
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} />
      {description && <p>{description}</p>}
      <FieldError>{errorMessage}</FieldError>
    </AriaColorField>
  );
}

export default ColorField;
