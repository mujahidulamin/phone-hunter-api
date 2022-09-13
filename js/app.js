const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    //display no phones found
    const noPhoneMeassage = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        noPhoneMeassage.classList.remove('d-none');
    } else {
        noPhoneMeassage.classList.add('d-none');
    }

    // display all phones found
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick = "loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    // start loader
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}


// search function and button
document.getElementById('btn-search').addEventListener('click', function () {
    //start loader
    processSearch(10);
})

//search input field enter key handler

document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

// spinner function
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    } else {
        loadingSpinner.classList.add('d-none');
    }
}

//not the best solution
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

//load phone details
const loadPhoneDetails = async (phonDetails) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phonDetails}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <img " class = "mx-auto d-block" src="${phone.image}" alt="">
       <p class = "text-center">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p> 
       <p class = "text-center">Main Features: Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Storage found'}</p> 
       <p class = "text-center">Others: Bluetooth: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'No others found'}</p> 
    
    `
}

loadPhones('apple');
