<script>

</script>

<template>
    <VForm style="width: 800px;" class="border pa-13 d-flex flex-column" v-bind="$attrs">
        <div class="mx-auto" style="width: fit-content;">
            <slot name="header"/>
        </div>
        <div class="body">
            <slot name="body"/>
        </div>
        <div class="footer">
            <slot name="footer"/>
        </div>
    </VForm>
</template>

<style lang="css" scoped>
.header {

}
</style>
