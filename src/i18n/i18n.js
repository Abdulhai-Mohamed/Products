import ar from "./locals/ar.json";
import en from "./locals/en.json";
import de from "./locals/de.json";

const locales = {
  ar,
  en,
  de,
};
const resources = {
  ar: { translation: locales.ar },
  en: { translation: locales.en },
  de: { translation: locales.de },
};

export default resources;
