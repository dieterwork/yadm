import type { DefaultNS, Resources } from "../config";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Resources;
    enableSelector: true;
  }
}
