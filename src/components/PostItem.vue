<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: {
        id: 1,
        title: "default post",
        body: "none",
      },
    },
  },
};
</script>

<template>
  <div class="post" :key="post.id">
    <div class="post-content" id="{{ post.id }}">
      <h1>{{ post.id }}</h1>
      <div class=""><strong>Название: </strong> {{ post.title }}</div>
      <div class=""><strong>Описание: </strong> {{ post.body }}</div>
      <ButtonV1 class="btn-post-delete" @click="$emit('delete-post')">
        Удалить пост
      </ButtonV1>
    </div>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  margin: 15px;

  min-width: 700px;

  border-radius: 6px;
  border: 1px solid teal;
}
</style>