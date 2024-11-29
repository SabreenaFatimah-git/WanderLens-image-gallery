const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".uil-times");
const downloadImgBtn = lightBox.querySelector(".uil-import");
let searchTerm = null;


let apiKey = "HPHmofuXdkCfQ0n8Kw7XlA5W3ocUeYq8AwQsk14o9Mw";
const perPage = 15;
let currentPage = 1;

const downloadImg = (imgURL) => {
    // converting recived img to blob & creating its doenload link & downloading it.
    fetch(imgURL).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!!"));
}


const showLightbox = (name, img) => {
    // showing lightbox & img source , name
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow ="hidden";
    console.log("hiiiiii")
}

const hideLightbox = () =>{
    lightBox.classList.remove("show");
    document.body.style.overflow ="auto";
}

const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card" onclick="showLightbox('${img.user.first_name} ${img.user.last_name}', '${img.urls.full}')">
                      <img src="${img.urls.full}" alt="img">
                      <div class="details">
                          <div class="photographer">
                              <i class="uil uil-camera"></i>
                          <span>${img.user.first_name} ${img.user.last_name}</span>
                      </div>
                      <button onclick="downloadImg('${img.urls.full}');event.stopPropagation();">
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
        console.log(data);
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
        getImages(`https://api.unsplash.com/search/photos?query=${searchTerm}&per_Page=${perPage}&P=${currentPage}&client_id=${apiKey}`);
    }
}

getImages(`https://api.unsplash.com/search/photos?query=lifestyle&per_page=${perPage}&page=${currentPage}&client_id=${apiKey}`);

loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
