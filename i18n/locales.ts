export enum LocaleKey {
  RU = 'ru',
  EN = 'en',
}

export interface LocaleItem {
  key: LocaleKey
  label: string
}

export const locales: LocaleItem[] = [
  {
    key: LocaleKey.RU,
    label: 'Русский',
  },
  {
    key: LocaleKey.EN,
    label: 'English',
  },
]
