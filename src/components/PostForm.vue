<script>
export default {
  name: "PostForm",
  props: {
    changeShow: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  data: () => {
    return {
      title: "",
      body: "",
    };
  },
  methods: {
    sendPostEntity() {
      this.$emit("create-post", { title: this.title, body: this.body });
      this.title = "";
      this.body = "";
      this.changeShow();
    },
  },
};
</script>

<template>
  <form>
    <InputV1
      class="input"
      :placeholder="'Название'"
      :value="title"
      @change-value="(v) => (title = v)"
    />
    <InputV1
      class="input"
      :placeholder="'Описание'"
      :value="body"
      @change-value="(v) => (body = v)"
    />
    <ButtonV1 :disabled="!(title && body)" class="" @click.prevent="sendPostEntity"> Создать </ButtonV1>
  </form>
</template>

<style scoped>
.close-button {
  background-color: red;
}
</style>