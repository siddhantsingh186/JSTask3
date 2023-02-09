
const URL = 'https://fakestoreapi.com/products';


const products = [];

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        products.push(...data);
        console.log(products);
        displayProducts();
        displayCategories();
    });



function displayContent(product){
    const productElement = document.createElement("div");
    let productList = document.getElementById('productsList');
    productElement.classList.add("card");
    productElement.style.width = "18rem";
    productElement.style.marginLeft = "20px";

    const imageElement = document.createElement("img");
    imageElement.classList.add("card-img-top");
    imageElement.alt = 'Card image';
    imageElement.src = product.image;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title");
    titleElement.innerText = product.title;
    
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("card-text");
    descriptionElement.innerText = product.description;

    const ratingElement = document.createElement("p");
    ratingElement.classList.add("card-text");
    ratingElement.innerText = "Rating: " + product.rating.rate;

    const priceElement = document.createElement("p");
    priceElement.classList.add("card-text");
    priceElement.innerText = "Price: " + product.price;

    productElement.appendChild(imageElement);
    productElement.appendChild(cardBody);
    cardBody.appendChild(titleElement);
    cardBody.appendChild(descriptionElement);
    cardBody.appendChild(ratingElement);
    cardBody.appendChild(priceElement);
    productList.appendChild(productElement);
}   

function getSearchInput(){
    let searchInput = document.getElementById('search-input').value;
    let productList = document.getElementById('productsList');
    productList.innerHTML = '';
    if(searchInput == ''){
        displayProducts();
        return false;
    }
    else{
        products.filter((product) => {
            if(product.title.toLowerCase().includes(searchInput.toLowerCase())){
                displayContent(product);
            }
        });
    }
}

function displayProducts(){
    let productList = document.getElementById('productsList');
    products.forEach((product) => {
        displayContent(product);     
    });
}

function displayCategories(){
    let categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';

    let categories = [];
    products.forEach((product) => {
        if(!categories.includes(product.category)){
            categories.push(product.category);
        }
    });
    console.log(categories);

    categories.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.classList.add("categoryItem");
        const categoryLink = document.createElement("a");
        categoryLink.href = '#';
        categoryLink.classList.add("dropdown-item");
        const formCheck = document.createElement("div");
        formCheck.classList.add("form-check");
        const formCheckInput = document.createElement("input");
        formCheckInput.classList.add("form-check-input");
        formCheckInput.type = 'checkbox';
        formCheckInput.value = category;
        const formCheckLabel = document.createElement("label");
        formCheckLabel.classList.add("form-check-label");
        formCheckLabel.innerText = category;
        formCheckLabel.style.textTransform = 'capitalize';

        formCheck.appendChild(formCheckInput);
        formCheck.appendChild(formCheckLabel);
        categoryLink.appendChild(formCheck);
        categoryElement.appendChild(categoryLink);
        categoryList.appendChild(categoryElement);
    });

}


addEventListener('click', (event) => {
    if(event.target.classList.contains('form-check-input')){
        categoryFilter();
    }
});

let categories = [];

function categoryFilter(){
    var checkedCategories = [];
    let categoryList = document.getElementById('categoryList');
    categoryList.querySelectorAll('input').forEach((input) => {
        if(input.checked){
            checkedCategories.push(input.value);
        }
    });
    categories = checkedCategories;
    if(checkedCategories.length == 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        displayProducts();
        return false;
    }
    let productList = document.getElementById('productsList');
    productList.innerHTML = '';
    products.filter((product) => {
        if(checkedCategories.includes(product.category)){
            displayContent(product);
        }
    });
    return true;
}

addEventListener('click', (event) => {
    if(event.target.classList.contains('form-check-input2')){
        ratingFilter();
    }
});

let filterRatings = [];
function ratingFilter(){
    console.log(categories);
    console.log(products);
    let ratingList = document.getElementById('ratingList');
    var checkedRatings = [];
    ratingList.querySelectorAll('input').forEach((input) => {
        if(input.checked){
            checkedRatings.push({minval : parseInt(input.value), maxval : parseInt(input.value) + 1});
        }
    });
    filterRatings = checkedRatings;
    console.log(checkedRatings);
    if(categories.length == 0 && checkedRatings.length == 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        displayProducts();
        return false;
    }

    else if(categories.length == 0 && checkedRatings.length != 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        products.filter((product) => {
            checkedRatings.forEach((rating) => {
                if(product.rating.rate >= rating.minval && product.rating.rate < rating.maxval){
                    displayContent(product);
                }
            });
        });

        return true;
    }

    else if(categories.length != 0 && checkedRatings.length == 0){
        categoryFilter();
        return false;
    }

    else if(categories.length != 0 && checkedRatings.length != 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        products.filter((product) => {
            categories.includes(product.category) && checkedRatings.forEach((rating) => {
                if(product.rating.rate >= rating.minval && product.rating.rate < rating.maxval){
                    displayContent(product);
                }
            });
        });
                    
        return true;
    }
}

function orderByRating(){
    if(categories.length == 0 && filterRatings.length == 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        products.sort((a, b) => (a.rating.rate > b.rating.rate) ? 1 : -1);
        displayProducts();
        return false;
    }

    else if(categories.length == 0 && filterRatings.length != 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        products.sort((a, b) => (a.rating.rate > b.rating.rate) ? 1 : -1);
        ratingFilter();
        return false;
    }

    else if(categories.length != 0 && filterRatings.length == 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        products.sort((a, b) => (a.rating.rate > b.rating.rate) ? 1 : -1);
        categoryFilter();
        return false;
    }

    else if(categories.length != 0 && filterRatings.length != 0){
        let productList = document.getElementById('productsList');
        productList.innerHTML = '';
        products.sort((a, b) => (a.rating.rate > b.rating.rate) ? 1 : -1);
        ratingFilter();
        return false;
    }

}


