// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import axios from 'axios';

// const simplelightbox = new SimpleLightbox('.gallery__item');

// const API_URL = 'https://pixabay.com';

// const params = {
//     key : '34316730-360f829ab2b8fbc41f5ac52ed',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 40,
//     page: 1,
// };
// params.q = 'Ukraine';

// axios.get('')

// console.log(params);

// const refs = {
//     form: document.querySelector('#search-form'),
//     gallery: document.querySelector('.gallery'),
//     loadMoreBtn: document.querySelector('.load-more'),
// }

// refs.form.addEventListener('submit', onFormSubmit);
// refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);


// function onFormSubmit(e){
//     e.preventDefault();
//     refs.gallery.textContent = '';
//     value = e.currentTarget.elements.searchQuery.value;
//     searchAxios(value)
//     .then((response)=>{
//         if(!response.total){
//             return Promise.reject('Sorry, there are no images matching your search query. Please try again.')
//         }
//         const markup = getMarkup(response.hits);
//         renderMarkup(markup);
//         simplelightbox.refresh();
//     })
//     .catch((e)=>{
//         Notify.failure(e);
//     });
// }
// function onLoadMoreBtnClick(){
//     page++;
//     searchAxios(value, page)
//     .then((response)=>{
//         if(!response.total){
//             return Promise.reject('Sorry, there are no images matching your search query. Please try again.')
//         }
//         const markup = getMarkup(response.hits);
//         renderMarkup(markup);
//         simplelightbox.refresh();
//     })
//     .catch((e)=>{
//         Notify.failure(e);
//     });
// }

// async function searchAxios(look = '', page = 1){
//     try {
//         const response = await axios.get(`${API_URL}/api?${params}&q=${look}&page=${page}`);
//         return response.data;
//       } catch (error) {
//         console.error(error);
//       }
// }
// function getMarkup(hits){
//     return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>{
//         return `
//         <div class="photo-card">
//         <a class="gallery__item" href="${largeImageURL}">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes</b>
//             ${likes}
//           </p>
//           <p class="info-item">
//             <b>Views</b>
//             ${views}
//           </p>
//           <p class="info-item">
//             <b>Comments</b>
//             ${comments}
//           </p>
//           <p class="info-item">
//             <b>Downloads</b>
//             ${downloads}
//           </p>
//         </div>
//         </a>
//         </div>`;
//     }).join('');
// }
// function renderMarkup(markup){
//     refs.gallery.insertAdjacentHTML("beforeend", markup);
// }