<script setup lang="ts">
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
type Action = "login" | "register"
type FiledMap = Record<Action, Field[]> 


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
const getApiPayload = () => {
    if (isRegister.value) {
        return {
            login: fields.value.login[0].value,
            password: fields.value.login[1].value
        }
    }
    return {
        login: fields.value.login[0].value,
        password: fields.value.login[1].value,
        
    }
}

const lenRule = (v: string) => v && 2 < v.length && v.length < 100 || t('неверная длина')
// TODO: это плохо, тут по хорошему нужна мапа а не списки, но переделывать впадлу
const fields = ref<FiledMap>({
    register: [
        {
            value: '',
            label: t("ФИО"),
            rules: [
                lenRule,
                (v: string) => v && 6 < v.length && v.length < 100 && 2 <= v.split(/\s/).length && v.split(/\s/).length <= 5 || t('неверное фио') ],
            isPassword: false,
            showed: true
        },
        {
            value: '',
            label: t("Логин"),
            rules: [lenRule],
            isPassword: false,
            showed: true
        },
        {
            value: '',
            label: t("Пароль"),
            rules: [lenRule],
            isPassword: true,
            showed: false
        },
        {
            value: '',
            label: t("Подтвердите пароль"),
            rules: [lenRule],
            isPassword: true,
            showed: false
        }
    ],
    login: [
        {
            value: '',
            label: t('Логин'),
            rules: [],
            // rules: [lenRule],
            isPassword: false,
            showed: true
        },
        {
            value: '',
            label: t("Пароль"),
            rules: [],
            // rules: [lenRule],
            isPassword: true,
            showed: false
        },
    ]
})

const submit = async () => {
    console.log('call')
    if (isRegister.value) {
        await register({

        }
        )
    }else {
        await login({
            login: fields.value.login[0].value,
            password: fields.value.login[1].value

        })
    }
}
</script>

<template>
    <button @click="isRegister = !isRegister">
        change form
    </button>
    <div class="py-10"/>

    <UIForm>
        <template #header>
            {{ getHeaderLabel }}
        </template>
        <template #body>
            <div :class="['d-flex flex-column', isRegister ? 'ga-9' : 'ga-13']">
                <UIInput
                    v-for="field of fields[getAction]" 
                    :key="field.label" 
                    v-model="field.value" 
                    :label="field.label"
                    :rules="field.rules"
                    :type="getFieldType(field)"
                    :append-icon="getFieldShowedToggle(field)"
                    @click:append="field.showed = !field.showed"
                />
            </div>
        </template>
        <template #footer>
            <UIButton :text="getFooterLabel" @click="submit"/>
        </template>
    </UIForm>

</template>
