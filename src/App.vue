<script>
import { mapActions, mapGetters } from "vuex";
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import Pagination from "./components/Pagination.vue";

export default {
   components: {
      PostForm,
      PostList,
      Pagination,
   },
   data: () => {
      return {
         isShown: false,
         selectedSort: "",
         searchQuery: "",
         sortOptins: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По содержимому" },
         ],
      };
   },
   computed: {
      ...mapGetters({
         STATE: "STATE",
      }),
      searchedPosts() {},
   },
   watch: {
      selectedSort: {
         handler(value) {
            console.log(this.STATE.posts);
            // this.SORT_POSTS(value);
         },
         deep: true,
      },
   },
   async mounted() {
      await this.GET_POSTS();
   },
   methods: {
      ...mapActions({
         GET_POSTS: "GET_POSTS",
         DELETE_POST: "DELETE_POST",
         CREATE_POST: "CREATE_POST",
         SORT_POSTS: "SORT_POSTS",
         SEARCH_POSTS: "SEARCH_POSTS",
      }),
      createPost({ title, body }) {
         this.CREATE_POST({ title, body });
      },
      deletePost(id) {
         this.DELETE_POST(id);
      },
      showModal() {
         this.isShown = !this.isShown;
      },
      changeSelectedOption(value) {
         this.selectedSort = value;
      },
      search() {
         this.SEARCH_POSTS({
            search: this.searchQuery,
            sortType: this.selectedSort,
         });
      },
   },
};
</script>

<template>
   <div class="container">
      <ButtonV1 @click="showModal">Создать пост</ButtonV1>
      <MyModal :show="isShown" :change-show="showModal">
         <PostForm :change-show="showModal" @create-post="createPost" />
      </MyModal>
      <MySelect
         :value="selectedSort"
         :options="sortOptins"
         @change-value="changeSelectedOption"
      />
      <InputV1
         :value="searchQuery"
         :placeholder="'поиск ...'"
         @change-value="(v) => (searchQuery = v)"
      />
      <ButtonV1 @click="search">поиск</ButtonV1>
      <div class=""></div>
      <PostList v-if="!STATE.loading" @delete-post="deletePost" />
      <h1 v-else>... загрузка</h1>
      <Pagination />
   </div>
</template>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

.container {
   padding: 20px;
   margin: 0 auto;
}
form {
   display: flex;
   flex-direction: column;
}
.input {
   width: 100%;
   border: 1px solid teal;
   padding: 10px 15px;
   margin-top: 15px;
}
.btn {
   align-self: flex-end;
   margin-top: 15px;
   border: 1px solid teal;
   padding: 10px 15px;
   background: none;
   color: teal;
   cursor: pointer;
}
</style>
