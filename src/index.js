import Notiflix from 'notiflix';

async function getImg(query) {
    const axios = require('axios');
    const response = await axios.get("https://pixabay.com/api/?key=29442752-af1c576492f51578172834418&q=" + encodeURIComponent(query) + "&image_type=photo&orientation=orientation&safesearch=true&page=1&per_page=40");
    return await response.data.hits;
}

const searchForm = document.querySelector('form');
const gallery = document.querySelector('div.gallery');

const onSearch = (evt) => {
    evt.preventDefault();

    getImg(evt.currentTarget.searchQuery.value).then(result => {
        if (result.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        // console.log(result);
        result.map(photo => {
            // console.log(photo.tags);
            gallery.innerHTML += `
                <div class="photo-card">
                    <img src=${photo.webformatURL} alt=${photo.tags} loading="lazy" />
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
                </div>           
            `
        });
    });
    
}

searchForm.addEventListener('submit', onSearch);