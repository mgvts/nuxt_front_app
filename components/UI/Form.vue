<script></script>

<template>
  <VForm class="border pa-13 d-flex flex-column w-100" v-bind="$attrs">
    <div class="mx-auto" style="width: fit-content">
      <slot name="header" />
    </div>
    <div class="body">
      <slot name="body" />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </VForm>
</template>

<style lang="css" scoped>
.header {
}
</style>
