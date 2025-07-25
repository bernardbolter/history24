import { createInstance, i18n, TFunction } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

const initI18next = async (lng: string, ns: string | string[]): Promise<i18n> => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, Array.isArray(ns) ? ns[0] : ns))
  return i18nInstance
}

interface UseTranslationResponse {
  t: TFunction;
  i18n: i18n;
}

interface TranslationOptions {
  keyPrefix?: string;
}

export async function useTranslation(
  lng: string, 
  ns: string | string[], 
  options: TranslationOptions = {}
): Promise<UseTranslationResponse> {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}