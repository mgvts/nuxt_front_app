import type { ComposerCustom } from '#i18n'

import type { LocaleKey } from '~/i18n/locales'
import { locales } from '~/i18n/locales'

export default defineNuxtPlugin(async function (app) {
  const i18n = app.$i18n as ComposerCustom

  const isValidLocale = (locale?: string): locale is LocaleKey => !!locale && locales.some(({ key }) => key === locale)
  const { getLocale,
    setLocale,
  } = useCookies()

  const cookieLocale = String(getLocale())

  if (isValidLocale(cookieLocale)) {
    await i18n.setLocale(cookieLocale)
    setLocale(cookieLocale)
    return
  }

  const browserLocale = i18n.getBrowserLocale()

  if (browserLocale && isValidLocale(browserLocale)) {
    await i18n.setLocale(browserLocale)
    setLocale(browserLocale)
    return
  }
})
