<script>
export default {
  name: "MySelect",
  props: {
    value: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
};
</script>

<template>
  <select :value="value" @change="$emit('change-value', $event.target.value)">
    <option disabled value="" selected>Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
select {
  border-radius: 3px;
  border: 1px solid teal;
  
  color: teal;
  outline: none;

  padding: 6px 15px;
}
select:focus {
  outline: none;
}
</style>
