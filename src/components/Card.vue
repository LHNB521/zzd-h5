<template>
  <wd-card
    custom-class="card"
    custom-content-class="card-content"
    custom-title-class="card-title"
    custom-footer-class="card-footer"
    v-bind="$attrs"
  >
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </wd-card>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
:deep(.card-title) {
  padding: 0px !important;
}
:deep(.card-content) {
  padding: 10px 0px !important;
}
:deep(.card-footer) {
  padding: 0px !important;
  padding-bottom: 10px !important;
}
</style>
