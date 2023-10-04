import LanguageUtils from "../resources/locales/LanguageUtils";

function t(key: string) {
  return LanguageUtils.getLangText(key);
}

export { t };
