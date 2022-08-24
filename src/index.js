import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const PER_PAGE = 40;

async function getImg(query) {
    const axios = require('axios');
    const response = await axios.get(`https://pixabay.com/api/?key=29442752-af1c576492f51578172834418&q=${query}&image_type=photo&orientation=orientation&safesearch=true&page=${String(page)}&per_page=${PER_PAGE}`);
    return await response.data;
}

const searchForm = document.querySelector('form');
const gallery = document.querySelector('div.gallery');
const morePhotoBtn = document.querySelector('.load-more');
const endGallery = document.querySelector('.end-gallery');

let page = 1;
let queryCurrent = '';

const renderPage = (array) => {
    array.map(photo => {
        gallery.innerHTML += `
            <div class="photo-card">
                <a href=${photo.largeImageURL}>
                    <img class="link" src=${photo.webformatURL} alt=${photo.tags} loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b><br>${photo.likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b><br>${photo.views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b><br>${photo.comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b><br>${photo.downloads}
                    </p>
                </div>
            </div>`
    });
}

const onEndGallery = (amount) => {
    if (amount < PER_PAGE) {
        morePhotoBtn.classList.add('is-hidden');
        endGallery.classList.remove('is-hidden');
    }
}

const onSearch = (evt) => {
    evt.preventDefault();
    
    if (queryCurrent === '') {
        queryCurrent = evt.currentTarget.searchQuery.value;
    } else if (queryCurrent !== evt.currentTarget.searchQuery.value) {
        queryCurrent = evt.currentTarget.searchQuery.value;
        gallery.innerHTML = '';
        morePhotoBtn.classList.toggle('is-hidden');
    } else { return };

    if (evt.currentTarget.searchQuery.value === '') {
        gallery.innerHTML = '';
        morePhotoBtn.classList.add('is-hidden');
        endGallery.classList.add('is-hidden');
        return;
    };
    
    getImg(queryCurrent).then(result => {
        if (result.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
        renderPage(result.hits);
        morePhotoBtn.classList.toggle('is-hidden');
        endGallery.classList.add('is-hidden');
        onEndGallery(result.hits.length);
    });
}

const onClickMoreBtn = (evt) => {
    page += 1;
    getImg(queryCurrent).then(result => {
        if (result.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        renderPage(result.hits);
        onEndGallery(result.hits.length);
    });
    const lightbox = new SimpleLightbox('.gallery a', {});
    lightbox.refresh();
}

const bigImg = document.querySelector('.gallery');
const onClickImg = (evt) => {
    evt.preventDefault();
    const lightbox = new SimpleLightbox('.gallery a', {});
}

searchForm.addEventListener('submit', onSearch);
morePhotoBtn.addEventListener('click', onClickMoreBtn);
bigImg.addEventListener('click',onClickImg)


