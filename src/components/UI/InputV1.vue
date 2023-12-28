<script>
export default {
   name: "InputV1",
   props: {
      placeholder: {
         type: String,
         required: false,
      },
      value: {
         type: String,
         required: true,
      },
   },
   data: () => {
      return {};
   },
};
</script>

<template>
   <input
      class="input"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('change-value', $event.target.value)"
   />
</template>

<style scoped>
.input {
   border: 1px solid teal;
   border-radius: 3px;
   padding: 7px 15px;
}
</style>
