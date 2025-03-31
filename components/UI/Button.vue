<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        required: true,
    }
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
    return [
        'btn',
        `btn--${props.variant}`,
        { 'btn--disabled': props.disabled },
    ]
})

const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
        emit('click', event)
    }
}
</script>

<template>
    <button :class="buttonClass" @click="handleClick">
        <slot>{{ props.text }}</slot>
    </button>
</template>


<style scoped>
.btn {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.btn--primary {
    background-color: #007bff;
    color: white;
}

.btn--primary:hover {
    background-color: #0069d9;
}

.btn--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>