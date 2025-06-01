<script setup lang="ts">
import type { LoginPayload, RegisterPayload } from '~/types/auth'
import messages from './locale.json'

const { t } = useI18n({ messages })
const {
    register,
    login,
} = useAuthStore()

interface Field {
    value: string,
    label: string,
    rules: ((val: string) => boolean | string)[]
    isPassword: boolean
    showed: boolean
}
interface LoginMap {
    login: Field
    password: Field
}
interface RegisterMap {
    name: Field
    login: Field
    password: Field
    repeatPassword: Field
}
interface FiledMap {
    login: LoginMap
    register: RegisterMap
} 


const isRegister = ref(true)
const getAction = computed(() => isRegister.value ? 'register' : 'login')
const getFieldType = (field: Field) => field.isPassword && !field.showed ? "password" : "text"
const getFieldShowedToggle = (field: Field) => field.isPassword ? field.showed ? 'mdi-eye' : 'mdi-eye-off' : undefined

const headerLabelMap = {
    login: t('Создать аккаунт'),
    register: t('Войти'),
}
const footerLabelMap = {
    login: t('войти'),
    register: t('зарегистрироваться'),
}

const getHeaderLabel = computed(() => {
    return headerLabelMap[getAction.value]
})
const getFooterLabel = computed(() => {
    return footerLabelMap[getAction.value]
})
const getApiPayload = (): RegisterPayload | LoginPayload => {
    if (isRegister.value) {
        return {
            name: fields.value.register.name.value,
            login: fields.value.register.login.value,
            password: fields.value.register.password.value
        }
    }
    return {
        login: fields.value.login.login.value,
        password: fields.value.login.login.value,
    }
}

const lenRule = (v: string) => v && 2 < v.length && v.length < 100 || t('неверная длина')
// TODO: это плохо, тут по хорошему нужна мапа а не списки, но переделывать впадлу
const fields = ref<FiledMap>({
    register: {
        name: {
            value: '',
            label: t("ФИО"),
            rules: [
                lenRule,
                (v: string) => v && 6 < v.length && v.length < 100 && 2 <= v.split(/\s/).length && v.split(/\s/).length <= 5 || t('неверное фио')],
            isPassword: false,
            showed: true
        },
        login: {
            value: '',
            label: t("Логин"),
            rules: [lenRule],
            isPassword: false,
            showed: true
        },
        password: {
            value: '',
            label: t("Пароль"),
            rules: [lenRule],
            isPassword: true,
            showed: false
        },
        repeatPassword: {
            value: '',
            label: t("Подтвердите пароль"),
            rules: [lenRule],
            isPassword: true,

        },
    },
    login: {
        login: {
            value: '',
            label: t('Логин'),
            rules: [],
            // rules: [lenRule],
            isPassword: false,
            showed: true
        },
        password: {
            value: '',
            label: t("Пароль"),
            rules: [],
            // rules: [lenRule],
            isPassword: true,
            showed: false
        }
    }
})

const submit = async () => {
    const router = useRouter()
    const payload = getApiPayload()
    try {
        if (isRegister.value) {
            await register(payload as RegisterPayload)
        } else {
            await login(payload)
        }
        router.push('/')
    } catch (e) {
        console.error(e)
    }
}
</script>

<template>
    <UIButton @click="isRegister = !isRegister">
        change form
    </UIButton>
    <div class="py-10" />

    <UIForm>
        <template #header>
            {{ getHeaderLabel }}
        </template>
        <template #body>
            <div :class="['d-flex flex-column', isRegister ? 'ga-9' : 'ga-13']">
                <UIInput v-for="field of fields[getAction]" :key="field.label" v-model="field.value"
                    :label="field.label" :rules="field.rules" :type="getFieldType(field)"
                    :append-icon="getFieldShowedToggle(field)" @click:append="field.showed = !field.showed" />
            </div>
        </template>
        <template #footer>
            <UIButton :text="getFooterLabel" @click="submit" />
        </template>
    </UIForm>

</template>
