import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useTitleTranslate = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t(($) => $["YADM"]);
  }, [t]);
};

export default useTitleTranslate;
