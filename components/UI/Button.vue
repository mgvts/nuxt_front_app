<script setup lang="ts">
import { defineProps, Fragment } from 'vue'

const props = defineProps({
    color: {
        type: String,
        default: 'background',
    },
    text: {
        type: String,
        default: undefined,
    },
    hoverable: {
        type: Boolean,
        default: true
    },
    hoverColor: {
        type: String,
        default: 'primary'
    }
})
const computedColor = (isHovering: boolean | null) => {
    if (!props.hoverable) return props.color

    const hover = props.hoverColor || props.color
    return isHovering ? hover : props.color
}
</script>

<template>
    <v-hover v-slot="{isHovering, props: hoverProps}">
        <div v-bind="hoverProps" class="w-100">
            <VBtn 
                v-bind="$attrs"
                :color="computedColor(isHovering)"
                class="text-h4 w-100 rounded-pill"
                height="65px"
            >
                <slot>
                    {{ text }}
                </slot>
            </VBtn>
        </div>
    </v-hover>
</template>

