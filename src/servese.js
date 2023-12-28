// Получение списка страниц в зависимости от currentPage и offset
export const getPagesOffsetForCurrentPage = (
   currentPage,
   pagesCount,
   elementsCount
) => {
   const pagesNumbers = [];

   // Смещение
   const offset = (elementsCount - (elementsCount % 2 === 0 ? 0 : 1)) / 2;
   
   // Проверяем является ли currentPage центральным элементом
   const isCenter = currentPage > offset && currentPage <= pagesCount - offset;

   // Проверяем находится ли currentPage в начале 
   const isBeginning = currentPage - 1 < offset;

   // Проверяем находится ли currentPage в конце
   const isEnd = pagesCount - currentPage < offset;

   // Страницы "c" и "до"
   let pagesStart = 1;
   let pagesEnd = pagesCount;

   if (isBeginning) {
      pagesStart = 1;
      pagesEnd = elementsCount;
   } else if (isEnd) {
      pagesStart = pagesCount - elementsCount + 1;
      pagesEnd = pagesCount;
   } else if (isCenter) {
      pagesStart = currentPage - offset;
      pagesEnd = currentPage + offset;
   }

   for (let i = pagesStart; i <= pagesEnd; i++) {
      pagesNumbers.push(i);
   }
   
   return pagesNumbers;
};
