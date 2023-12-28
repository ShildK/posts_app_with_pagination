import axios from "axios";
import { createStore } from "vuex";

export default createStore({
   state() {
      return {
         posts: [],
         loading: false,
         page: 1,
         limit: 10,
         totalPages: 10,
      };
   },
   getters: {
      STATE: (state) => state,
      POSTS: (state) => state.posts,
      APP_LOADING: (state) => state.loading,
   },

   mutations: {
      SET_POSTS: (state, data) => {
         state.posts = data.posts;
         state.limit = data.limit;
         state.totalPages = data.totalPages;
         state.page = data.page;
      },

      CHANGE_LOADING: (state) => {
         state.loading = !state.loading;
      },

      DELETE_POST_BY_ID: (state, data) => {
         state.posts = state.posts.filter((post) => post.id !== data);
      },

      CREATE_NEW_POST: (state, data) => {
         state.posts.push({
            ...data,
            id: Date.now(),
            userId: 9999,
         });
      },

      SORT_POSTS: (state, data) => {
         state.posts = state.posts.sort((a, b) => {
            return a[data]?.localeCompare(b[data]);
         });
      },

      SEARCH_POSTS_BY_QUERY: (state, data) => {
         state.posts = state.posts.filter((post) => {
            return post.title.toLowerCase().includes(data.toLowerCase());
         });
      },
   },
   actions: {
      GET_POSTS: async ({ state, commit }, payload) => {
         commit("CHANGE_LOADING");

         const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
               params: {
                  _page: payload?.page || state.page,
                  _limit: payload?.limit || state.limit,
               },
            }
         );

         const allPosts = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
         );

         const totalItems = allPosts.data.length;
         const totalPages = Math.ceil(totalItems / payload?.limit || state.limit);

         commit("SET_POSTS", {
            posts: data,
            page: payload?.page || state.page,
            limit: payload?.limit || state.limit,
            totalPages,
         });

         commit("CHANGE_LOADING");
      },

      DELETE_POST: ({ commit }, payload) => {
         commit("CHANGE_LOADING");
         setTimeout(() => {
            commit("DELETE_POST_BY_ID", payload);
            commit("CHANGE_LOADING");
         }, 500);
      },

      CREATE_POST: ({ commit }, payload) => {
         commit("CHANGE_LOADING");
         setTimeout(() => {
            commit("CREATE_NEW_POST", payload);
            commit("CHANGE_LOADING");
         }, 500);
      },

      SEARCH_POSTS: ({ commit, dispatch }, { search, sortType }) => {
         commit("CHANGE_LOADING");
         setTimeout(() => {
            commit("SEARCH_POSTS_BY_QUERY", search);
            dispatch("SORT_POSTS", sortType);
            commit("CHANGE_LOADING");
         }, 500);
      },

      SORT_POSTS: ({ commit }, payload) => {
         commit("CHANGE_LOADING");
         setTimeout(() => {
            commit("SORT_POSTS", payload);
            commit("CHANGE_LOADING");
         }, 500);
      },

      GET_POSTS_BY_PAGE: async ({ state, commit }, page) => {
         // commit("CHANGE_LOADING");

         const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
               params: {
                  _page: page,
                  _limit: state.limit,
               },
            }
         );
         commit("SET_POSTS", {
            posts: data,
            page: page,
            limit: state.limit,
            totalPages: state.totalPages
         });
         // commit("CHANGE_LOADING");
      },
      
      CHANGE_LIMIT: async ({ state, commit }, newLimit) => {
         commit("CHANGE_LOADING");
         try {
            const { data } = await axios.get(
               "https://jsonplaceholder.typicode.com/posts",
               {
                  params: {
                     _page: state.page,
                     _limit: newLimit,
                  },
               }
            );
            const allPosts = await axios.get(
              "https://jsonplaceholder.typicode.com/posts"
           );
  
           const totalItems = allPosts.data.length;
           const totalPages = Math.ceil(totalItems / newLimit);

            commit("SET_POSTS", {
               posts: data,
               page: state.page,
               limit: newLimit,
               totalPages,
            });

         } catch (error) {
            console.error("Error fetching data:", error);
         }

         commit("CHANGE_LOADING");
      },
   },
});
