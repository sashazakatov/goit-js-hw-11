import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchImages from './js/search_images';

const simplelightbox = new SimpleLightbox('.gallery__item');

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(e){
    e.preventDefault();
    SearchImages.q = e.currentTarget.elements.searchQuery.value;
    rest();
    renderResolt();
}
const observer = new IntersectionObserver(observerCallback, {
  rootMargin: '0px 0px 300px 0px',
});
function observerCallback([entry], observe){
  if(entry.isIntersecting){
    observe.unobserve(entry.target);
    SearchImages.page += 1;
    renderResolt();
  }
}
async function renderResolt(){
    try {
        const data = await SearchImages.searchAxios();
        if(!data.totalHits){
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }else if(data.totalHits < SearchImages.page * SearchImages.per_page){
          Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
        }
        else{
          renderMarkup(getMarkup(data.hits));
          simplelightbox.refresh();
          const lastPhotoCard = document.querySelector('.photo-card:last-child');
          observer.observe(lastPhotoCard);
        }
      } catch(error) {
        console.log(error.message);
      }
}
function getMarkup(hits){
    return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>{
        return `
        <div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
        </div>`;
    }).join('');
}
function renderMarkup(markup){
    refs.gallery.insertAdjacentHTML("beforeend", markup);
}
function rest(){
    refs.gallery.textContent = '';
    SearchImages.page = 1;
} 