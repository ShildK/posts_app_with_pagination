<script>
export default {
  name: "ButtonV1",
};
</script>

<template>
  <button class="btn" @click.prevent="$emit('eventValue')">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  border: 1px solid teal;
  padding: 7px 15px;

  border-radius: 3px;
  
  color: teal;
  cursor: pointer;
}
</style>