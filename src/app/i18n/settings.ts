export const fallbackLng = 'en'
export const languages = [fallbackLng, 'de']
export const defaultNS = 'common'
export const cookieName = 'i18next'

interface I18nOptions {
  supportedLngs: string[];
  fallbackLng: string;
  lng: string;
  fallbackNS: string;
  defaultNS: string;
  ns: string;
}

export function getOptions (lng = fallbackLng, ns = defaultNS): I18nOptions {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}