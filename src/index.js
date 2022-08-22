async function getImg(query) {
    const axios = require('axios');
    const response = await axios.get("https://pixabay.com/api/?key=29442752-af1c576492f51578172834418&q=" + encodeURIComponent(query) + "&image_type=photo&orientation=orientation&safesearch=true");
    return await response.data.hits;
}

getImg('car').then(result => console.log(result));