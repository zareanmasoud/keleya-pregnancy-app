import * as RNLocalize from "react-native-localize";
import StorageService from "../../utils/StorageService";

import en from "./en";
import de from "./de";

export default class LanguageUtils {
  static languages = {
    english: "english",
    german: "german",
  };

  static changeLanguageGlobal = "CHANGE_LANGUAGE_GLOBAL";

  static germanLocales = ["de", "en"];

  static currentAppLanguage = this.setAppLanguageFromDeviceLocale(true);

  static async setAppLanguageFromDeviceLocale(needToGetLang) {
    const deviceLocale = RNLocalize.findBestLanguageTag(this.germanLocales);

    const languageTag = deviceLocale?.languageTag || "en";

    const isGermanDetected = this.germanLocales.find(() => languageTag === "de");

    const language = isGermanDetected ? this.languages.german : this.languages.english;

    if (needToGetLang) {
      return language;
    }

    await this.setAppLanguage(language);
  }

  static async getAppLanguageFromDeviceStorage() {
    return StorageService.getItem(StorageService.APP_LANGUAGE);
  }

  static async setAppLanguageFromDeviceStorage() {
    const language = await this.getAppLanguageFromDeviceStorage();
    if (language) {
      await this.setAppLanguage(language);
    } else {
      await this.setAppLanguageFromDeviceLocale();
    }
  }

  static async setAppLanguage(language) {
    this.currentAppLanguage = language;
    await StorageService.saveItem(StorageService.APP_LANGUAGE, language);
  }

  static getLangText(key) {
    if (this.currentAppLanguage === this.languages.german) return de[key];
    return en[key];
  }
}
