import type { LocaleKey } from '~/i18n/locales'
import type { JWT } from '~/types'

export const useCookies = () => {
  const locale = useCookie('lang', { default: () => 'ru' })
  const jwt = useCookie('jwt', { default: () => '' })
  const themeCookie = useCookie('theme', { default: () => 'light' })
  const login = useCookie('login', { default: () => '' })

  const getLocale = (): string | undefined | null => {
    return locale.value
  }

  const setLocale = (lang?: LocaleKey) => {
    locale.value = lang
  }

  const setJWT = (token?: JWT) => {
    jwt.value = token
  }

  const getJWT = () => {
    return jwt.value
  }

  const setLogin = (newLogin?: string) => {
    login.value = newLogin
  }

  const setTheme = (newTheme: string) => {
    themeCookie.value = newTheme
  }

  return {
    locale,

    getLocale,
    setLocale,

    jwt,

    getJWT,
    setJWT,
    login,
    setLogin,

    themeCookie,
    setTheme,
  }
}
