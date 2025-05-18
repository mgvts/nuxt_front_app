<script setup lang="ts">
import type { LocaleKey } from '~/i18n/locales';
import { locales } from '~/i18n/locales'
const { getLocale, setLocale } = useI18nCookie()


const currentLocale: LocaleKey = computed<LocaleKey>(getLocale)
const updateLocale = async (locale: LocaleKey) => {
    setLocale(locale)
    await window.location.reload()
}
</script>


<template>
    <VBtnToggle 
        :value="currentLocale"
        mandatory 
        @update:model-value="updateLocale"
    >
        <VBtn v-for="locale of locales" :key="locale.key" :value="locale.key">
            {{ locale.label }}
        </VBtn>
    </VBtnToggle>
</template>
