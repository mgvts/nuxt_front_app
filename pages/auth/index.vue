<script setup lang="ts">
import { useToast } from 'vue-toast-notification'
import messages from './locale.json'
import CustomButton from '~/components/UI/CustomButton.vue'
import CustomInput from '~/components/UI/CustomInput.vue'
import type { LoginPayload, RegisterPayload } from '~/types/auth'

const toast = useToast()
const { t } = useI18n({ messages })
const { register, login } = useAuthStore()

interface Field {
  value: string
  label: string
  rules: ((val: string) => boolean | string)[]
  isPassword: boolean
  showed: boolean
  error: string
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

const isRegister = ref(false)
const getAction = computed(() => (isRegister.value ? 'register' : 'login'))
const getFieldType = (field: Field) =>
  field.isPassword && !field.showed ? 'password' : 'text'

const headerLabelMap = {
  login: t('Войти'),
  register: t('Создать аккаунт'),
}
const footerLabelMap = {
  login: t('Войти'),
  register: t('Зарегистрироваться'),
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
      password: fields.value.register.password.value,
    }
  }
  return {
    login: fields.value.login.login.value,
    password: fields.value.login.password.value,
  }
}

const lenRule = (v: string) =>
  (v && 2 < v.length && v.length < 100) || t('неверная длина')

const fields = ref<FiledMap>({
  register: {
    name: {
      value: '',
      label: t('ФИО'),
      rules: [
        lenRule,
        (v: string) =>
          (v
            && 6 < v.length
            && v.length < 100
            && 2 <= v.split(/\s/).length
            && v.split(/\s/).length <= 5)
          || t('неверное фио'),
      ],
      isPassword: false,
      showed: true,
      error: '',
    },
    login: {
      value: '',
      label: t('Логин'),
      rules: [lenRule],
      isPassword: false,
      showed: true,
      error: '',
    },
    password: {
      value: '',
      label: t('Пароль'),
      rules: [lenRule],
      isPassword: true,
      showed: false,
      error: '',
    },
    repeatPassword: {
      value: '',
      label: t('Подтвердите пароль'),
      rules: [lenRule],
      isPassword: true,
      showed: false,
      error: '',
    },
  },
  login: {
    login: {
      value: '',
      label: t('Логин'),
      rules: [lenRule],
      isPassword: false,
      showed: true,
      error: '',
    },
    password: {
      value: '',
      label: t('Пароль'),
      rules: [lenRule],
      isPassword: true,
      showed: false,
      error: '',
    },
  },
})

const validateField = (field: Field) => {
  for (const rule of field.rules) {
    const result = rule(field.value)
    if (result !== true) {
      field.error = result as string
      return false
    }
  }
  field.error = ''
  return true
}

const validateForm = () => {
  let isValid = true
  for (const field of Object.values(fields.value[getAction.value])) {
    if (!validateField(field)) {
      isValid = false
    }
  }
  return isValid
}

const submit = async () => {
  if (!validateForm()) {
    return
  }
  const router = useRouter()
  const payload = getApiPayload()
  let account
  try {
    if (isRegister.value) {
      account = await register(payload as RegisterPayload)
      if (account) {
        toast.success(t('Регистрация успешно завершена!'), {
          position: 'top-right',
          duration: 3000,
        })
        router.push('/')
      }
    }
    else {
      account = await login(payload)
      if (account) {
        toast.success(t('Вход выполнен успешно!'), {
          position: 'top-right',
          duration: 3000,
        })
        router.push('/')
      }
    }
  }
  catch (e: unknown) {
    console.error(e)
    let errorMessage = t('Произошла ошибка. Пожалуйста, попробуйте снова.')

    if (e && typeof e === 'object') {
      const error = e as {
        statusCode?: number
        statusMessage?: string
        data?: { message?: string }
      }

      if (error.statusCode === 401) {
        errorMessage = t('Неверный логин или пароль')
      }
      else if (error.statusCode === 409) {
        errorMessage = t('Пользователь с таким логином уже существует')
      }
      else if (error.statusCode === 400) {
        errorMessage = error.data?.message || t('Неверные данные')
      }
      else if (error.statusCode && error.statusCode >= 500) {
        errorMessage = t('Сервер временно недоступен. Попробуйте позже')
      }
    }

    toast.error(errorMessage, {
      position: 'top-right',
      duration: 5000,
    })
  }
}
</script>

<template>
  <div class="auth-bg">
    <div class="auth-form-container">
      <div class="py-10" />

      <form
        class="auth-form"
        @submit.prevent="submit"
      >
        <div class="auth-form-header">
          {{ getHeaderLabel }}
        </div>
        <div class="auth-form-body">
          <div :class="['d-flex flex-column', isRegister ? 'ga-9' : 'ga-13']">
            <CustomInput
              v-for="field of fields[getAction]"
              :key="field.label"
              v-model="field.value"
              :label="field.label"
              :type="getFieldType(field)"
              :error="field.error"
              @blur="validateField(field)"
            />
          </div>
        </div>
        <div class="auth-form-footer">
          <CustomButton
            :text="getFooterLabel"
            type="submit"
          />
        </div>
      </form>
      <div class="auth-divider" />
      <div class="auth-bottom-text">
        <span>{{
          isRegister ? t("Уже зарегистрированы?") : t("Нет аккаунта?")
        }}</span>
        <button
          class="auth-toggle-btn"
          @click.prevent="isRegister = !isRegister"
        >
          {{ isRegister ? t("Войти") : t("Создать аккаунт") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-bg {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-background));
  position: relative;
  padding: 0 16px;
}
.auth-form-container {
  position: relative;
  background: rgba(255, 192, 203, 0.3);
  background-image: url("~/assets/img/Clouds.png");
  background-size: cover;
  background-position: top center;
  background-blend-mode: overlay;
  border-radius: 36px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
  padding: 40px 0 32px 0;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1;
  overflow: hidden;
}
.auth-form-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(var(--v-theme-background), 0.4);
  z-index: 0;
  transition: background 0.3s;
}
:root[data-theme="dark"] .auth-form-container::before {
  background: rgba(var(--v-theme-background), 0.85);
}
:root[data-theme="dark"] .auth-form-container {
  background: rgba(255, 192, 203, 0.2);
  background-blend-mode: overlay;
}
.auth-form-container > * {
  position: relative;
  z-index: 1;
}
.auth-form {
  background: transparent;
  box-shadow: none;
  width: 100%;
  border: none;
  padding: 0 20px;
}
.auth-form-header {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  text-align: center;
  margin-bottom: 32px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
:root[data-theme="dark"] .auth-form-header {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(var(--v-theme-primary), 0.3);
}
.auth-form-body {
  margin-bottom: 24px;
}
.auth-form-footer {
  margin-top: 8px;
}
/* Стилизация vuetify-полей и кнопки через deep */
.auth-form :deep(.v-text-field) {
  border-radius: 32px !important;
  background: rgba(255, 192, 203, 0.3) !important;
  box-shadow: 0 4px 16px rgba(142, 111, 248, 0.1) !important;
  border: 2.5px solid #bbaaff !important;
  font-size: 1.25rem;
  margin-bottom: 24px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}
.auth-form :deep(.v-text-field input) {
  font-size: 1.25rem;
  color: #6a4bb7;
  padding: 18px 22px !important;
  background: transparent !important;
}
.auth-form :deep(.v-text-field--focused) {
  box-shadow: 0 0 0 3px #8e6ff8 !important;
  border-color: #8e6ff8 !important;
}
.auth-form :deep(.v-field__outline) {
  transition: border-color 0.2s ease !important;
}
.auth-form :deep(.v-btn) {
  border-radius: 40px !important;
  font-size: 1.35rem !important;
  font-weight: 800 !important;
  padding: 12px 0 !important;
  background: #a18aff !important;
  color: #fff !important;
  box-shadow: 0 6px 24px rgba(142, 111, 248, 0.18) !important;
  text-shadow: 0 2px 8px #8e6ff8, 0 1px 1px #fff;
  letter-spacing: 0.02em;
  transition: background 0.2s, box-shadow 0.2s;
}
.auth-form :deep(.v-btn:hover) {
  background: #8e6ff8 !important;
  box-shadow: 0 8px 32px rgba(142, 111, 248, 0.22) !important;
}
.auth-toggle-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
  text-shadow: inherit;
}
:root[data-theme="dark"] .auth-toggle-btn {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2),
    0 0 4px rgba(var(--v-theme-primary), 0.2);
}
.auth-toggle-btn:hover {
  color: rgb(var(--v-theme-primary-1));
}
.auth-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    #bbaaff 40%,
    transparent 100%
  );
  margin: 32px 0 18px 0;
  opacity: 0.5;
}
.auth-bottom-text {
  margin-top: 0;
  text-align: center;
  color: rgb(var(--v-theme-primary));
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
:root[data-theme="dark"] .auth-bottom-text {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2),
    0 0 4px rgba(var(--v-theme-primary), 0.2);
}
.auth-login-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  background: none;
  text-decoration: underline;
  transition: color 0.3s;
}
.auth-login-link:hover {
  color: rgb(var(--v-theme-primary-1));
}
@media (max-width: 600px) {
  .auth-form-container {
    padding: 24px 16px 16px 16px;
    width: 100%;
    max-width: 420px;
    border-radius: 18px;
  }
  .auth-bg {
    padding: 0 8px;
  }
}
:root[data-theme="dark"] .auth-form :deep(.v-text-field) {
  background: rgba(255, 192, 203, 0.2) !important;
}
</style>
