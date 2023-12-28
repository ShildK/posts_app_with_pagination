<script>
import { mapGetters, mapActions } from "vuex";
import { getPagesOffsetForCurrentPage } from "../servese.js";

export default {
   name: "Pagination",
   props: {},
   data: () => {
      return {
         limiter: 10,
         pagesNumbers: [],
         currentPage: 1,
         buttonsCount: 5,
         maxButtonsCount: 5,
      };
   },
   computed: {
      ...mapGetters({
         STATE: "STATE",
      }),
   },
   watch: {
      // Можно ли использовать watch в таком случае?
      currentPage() {   
         this.updateNavigationBar();
      },
   },
   async mounted() {
      await this.GET_POSTS();
      (this.currentPage = this.STATE.page), (this.limiter = this.STATE.limit);

      // Получение списка страниц в зависимости от currentPage, totalPages и количества кнопок
      this.pagesNumbers = getPagesOffsetForCurrentPage(
         this.STATE.page,
         this.STATE.totalPages,
         this.buttonsCount
      );
   },

   methods: {
      ...mapActions({
         GET_POSTS: "GET_POSTS",
         CHANGE_LIMIT: "CHANGE_LIMIT",
         GET_POSTS_BY_PAGE: "GET_POSTS_BY_PAGE",
      }),
      pagePrev() {
         if (this.currentPage > 1) {
            this.currentPage -= 1;
         }
      },
      pageNext() {
         if (this.currentPage < this.STATE.totalPages) {
            this.currentPage += 1;
         }
      },
      async setLimit() {
         await this.CHANGE_LIMIT(this.limiter);
         if (this.currentPage !== 1) {
            this.currentPage = 1;
         } else {
            this.updateNavigationBar();
         }
      },
      goToThePage(page) {
         this.currentPage = page;
      },
      updateNavigationBar() {
         // Обновление количества кнопок
         this.buttonsCount =
            this.STATE.totalPages < this.maxButtonsCount
               ? this.STATE.totalPages
               : this.maxButtonsCount;

         // Получение списка страниц в зависимости от currentPage, totalPages и количества кнопок
         this.pagesNumbers =
            this.buttonsCount > 1
               ? getPagesOffsetForCurrentPage(
                    this.currentPage,
                    this.STATE.totalPages,
                    this.buttonsCount
                 )
               : [1];
         this.GET_POSTS_BY_PAGE(this.currentPage);
      },
   },
};
</script>

<template>
   <div class="pagination">
      <div class="limit">
         <InputV1
            class="input"
            :value="limiter.toString()"
            @change-value="(v) => (limiter = v)"
         />
         <ButtonV1 class="btn_limit" @click="setLimit"> Set limit </ButtonV1>
      </div>
      <div class="buttons_line">
         <ButtonV1 @click="goToThePage(1)">First</ButtonV1>
         <ButtonV1 :disabled="STATE.page <= 1" @click="pagePrev">
            {{ "<" }}
         </ButtonV1>

         <div
            class="btns_pages"
            v-for="page in pagesNumbers"
            :key="'item' + page"
         >
            <ButtonV1
               :class="page === currentPage ? 'current_page' : ''"
               @click="goToThePage(page)"
               >{{ page }}</ButtonV1
            >
         </div>

         <ButtonV1 @click="pageNext">{{ ">" }}</ButtonV1>
         <ButtonV1 @click="goToThePage(STATE.totalPages)">Last</ButtonV1>
      </div>
   </div>
</template>

<style scoped>
.pagination {
   min-width: 700px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 10px auto;
}
.buttons_line {
   display: flex;
   justify-content: space-between;
   align-items: center;
}
.limit {
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 190px;
   margin-right: 50px;
}
.input {
   width: 100px;
   border: 1px solid teal;
   margin-top: 15px;
   text-align: center;
}
.btn_limit {
   width: 90px;
}
.current_page {
   background-color: rgba(0, 128, 128, 0.322);
   font-weight: 700;
   transform: scale(1.1);
   margin-right: 1px;
   margin-left: 2px;
}
</style>
