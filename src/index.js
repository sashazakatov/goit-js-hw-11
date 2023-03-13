import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const simplelightbox = new SimpleLightbox('.gallery__item');

const _UNKNOWN_PARAMETERS = {
    page: 1,
    q: null
}

const params = {
    key : '34316730-360f829ab2b8fbc41f5ac52ed',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 20,
};

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
}


const instance = axios.create({
    baseURL: 'https://pixabay.com',
    params,
});

refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(e){
    e.preventDefault();
    _UNKNOWN_PARAMETERS.q = e.currentTarget.elements.searchQuery.value;
    rest();
    renderResolt();
}
const observer = new IntersectionObserver(observerCallback, {
  rootMargin: '0px 0px 300px 0px',
});
function observerCallback([entry], observe){
  if(entry.isIntersecting){
    observe.unobserve(entry.target);
    _UNKNOWN_PARAMETERS.page += 1;
    renderResolt();
  }
}
async function searchAxios(params = {}){
    console.log(1);
    const response = await instance.get('/api' ,{params});
    console.log(response);
    return await response.data;
}
async function renderResolt(){
    // try {
        const data = await searchAxios(_UNKNOWN_PARAMETERS);
        console.log(data)
        if(!data.totalHits){
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }else if(data.totalHits < _UNKNOWN_PARAMETERS.page * params.per_page){
          Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
        }
        else{
          renderMarkup(getMarkup(data.hits));
          simplelightbox.refresh();
          const lastPhotoCard = document.querySelector('.photo-card:last-child');
          observer.observe(lastPhotoCard);
          smoothScroll();
        }
      // } catch(error) {
      //   console.log(error.message);
      // }
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
    _UNKNOWN_PARAMETERS.page = 1;
}
function smoothScroll(){
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}