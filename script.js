const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".uil-times");
const downloadImgBtn = lightBox.querySelector(".uil-import");
let searchTerm = null;
let currentImageIndex = 0;
let allImages = [];


let apiKey = "YOUR API KEY";
const perPage = 15;
let currentPage = 1;

const downloadImg = (imgURL, event) => {
    event.stopPropagation();
    fetch(imgURL).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!!"));
}


const showLightbox = (name, img, index, photographerLink, imgLink) => {
    currentImageIndex = index;

    const imgContainer = lightBox.querySelector(".img");
    imgContainer.innerHTML = `<a href="${imgLink}" target="_blank"><img src="${img}" alt="img">
    <span class="tooltip">Unsplash Link</span>
    </a>`;

    lightBox.querySelector("span").innerHTML = `
    <a href="${photographerLink}" target="_blank" class="photographer-link">
        ${name}
    </a> on 
    <a href="https://unsplash.com" target="_blank" class="unsplash-link">
        Unsplash
    </a>
`;

    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow ="hidden";
}

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    const nextImg = allImages[currentImageIndex];
    showLightbox(nextImg.user.first_name + " " + nextImg.user.last_name, nextImg.urls.full, currentImageIndex,  nextImg.user.links.html, nextImg.links.html);
};

const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    const prevImg = allImages[currentImageIndex];
    showLightbox(prevImg.user.first_name + " " + prevImg.user.last_name, prevImg.urls.full, currentImageIndex, prevImg.user.links.html, prevImg.links.html);
};

const hideLightbox = () =>{
    lightBox.classList.remove("show");
    document.body.style.overflow ="auto";
}

const generateHTML = (images) => {
    allImages = images;
    imagesWrapper.innerHTML = images.map((img, index ) =>
        `<li class="card" onclick="showLightbox('${img.user.first_name} ${img.user.last_name}', '${img.urls.full}', ${index}, '${img.user.links.html}', '${img.links.html}')">
                      <img src="${img.urls.full}" alt="img">
                      <div class="details">
                          <div class="photographer">
                              <i class="uil uil-camera"></i>
                          <span>${img.user.first_name} ${img.user.last_name}</span>
                      </div>
                      <button onclick="downloadImg('${img.urls.full}', event);">
                      <i class="uil uil-import"></i>
                      </button>
                  </div>
              </li>`).join("");
}

const getImages = (apiURL) => {
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled")
    fetch(apiURL).then(res => res.json()).then(data => {
        generateHTML(data.results);
        // console.log(data);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled")
    }).catch(() => alert("Failed to load Images!"))
}

const loadMoreImages = () => {
    currentPage++;
    let apiURL = searchTerm
        ? `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=${perPage}&page=${currentPage}&client_id=${apiKey}`
        : `https://api.unsplash.com/search/photos?query=lifestyle&per_page=${perPage}&page=${currentPage}&client_id=${apiKey}`;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    if (e.target.value === "") return searchTerm = null;
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.unsplash.com/search/photos?query=${searchTerm}&per_Page=${perPage}&page=${currentPage}&client_id=${apiKey}`);
    }
}

getImages(`https://api.unsplash.com/search/photos?query=lifestyle&per_page=${perPage}&page=${currentPage}&client_id=${apiKey}`);

loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
document.querySelector(".prev").addEventListener("click", showPrevImage);
document.querySelector(".next").addEventListener("click", showNextImage);