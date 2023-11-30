import { translations as enTranslations } from "./en";
import { translations as nlTranslations } from "./nl";

import _ from "lodash";

const getTranslation = (lang: "nl" | "en" = "nl") => {
  if (lang == "en") {
    return enTranslations;
  }

  if (lang == "nl") {
    return _.merge(enTranslations, nlTranslations);
  }

  return enTranslations;
};

export default getTranslation();
