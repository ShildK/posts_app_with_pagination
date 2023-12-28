<script>
import { mapGetters } from "vuex";
import PostItem from "./PostItem.vue";
export default {
  name: "PostList",
  components: { PostItem },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters({
      STATE: "STATE",
    }),
  },
};
</script>

<template>
  <div>
    <h2>Список постов:</h2>
    <PostItem
      v-for="post in STATE.posts"
      :key="post.id"
      :post="post"
      @delete-post="$emit('delete-post', post.id)"
    />
  </div>
</template>

<style scoped></style>