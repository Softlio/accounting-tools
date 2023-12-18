import { translations as nlTranslations } from "./nl";

const getTranslation = (lang: "nl" | "en" = "nl") => {
  // if (lang == "en") {
  //   return enTranslations;
  // }

  // if (lang == "nl") {
  //   return _.merge(enTranslations, nlTranslations);
  // }

  return nlTranslations;
};

export default getTranslation();
