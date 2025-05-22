import type { LocaleKey } from "~/i18n/locales"
import type { JWT } from "~/types"

export const useI18nCookie = () => {
    const locale = useCookie('lang')
    const jwt = useCookie('jwt')


    const getLocale = (): string | undefined | null => {
        return locale.value
    }

    const setLocale = (lang: LocaleKey) => {
        locale.value = lang
    }

    const setJWT = (token: JWT)  => {
        jwt.value = token
    }
    const getJWT = () => {
        return jwt.value
    }

    return {
        locale,

        getLocale,
        setLocale,

        jwt,

        getJWT,
        setJWT,
    }
}
