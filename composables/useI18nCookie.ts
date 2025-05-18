import type { LocaleKey } from "~/i18n/locales"

export const useI18nCookie = () => {
    const locale = useCookie('lang')

    const getLocale = (): LocaleKey => {
        return locale.value
    }

    const setLocale = (lang: LocaleKey) => {
        locale.value = lang
    }

    return {
        locale,

        getLocale,
        setLocale,
    }
}
