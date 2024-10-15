<template>
  <wd-card
    custom-content-class="card-content"
    custom-title-class="card-title"
    custom-footer-class="card-footer"
  >
    <template #title>
      <slot name="title"></slot>
    </template>

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
:deep(.wd-card) {
  padding: 10px !important;
}
:deep(.card-title) {
  padding: 0px !important;
}
:deep(.card-content) {
  padding: 10px 0px !important;
}
:deep(.card-footer) {
  padding: 0px !important;
}
</style>
