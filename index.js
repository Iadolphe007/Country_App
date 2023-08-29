const searchBtn = document.getElementById('search-btn')
const inputField = document.querySelector('.input-field')
const filterRegionEl = document.getElementById('filter-region')
filterRegionEl.addEventListener('change', filterRegion)



// fetch country data with API
function fetch_country(){
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countryData = data
            display_country_list(data)
        })
        .catch(error => {
            alert('Error fetching data')
        })
}


// display the all country list
function display_country_list(data){
    const display_container = document.querySelector('.display')
    display_container.innerHTML = ''

    data.forEach(country => {
        const country_element = document.createElement('div');
        country_element.classList.add('country-item')
        country_element.innerHTML = `
        <div class="country-flag">
        <img src="${country.flags.png}" alt="${country.name.common}" class="flag">
        </div>
        <div class="country-info">
        <h4>${country.name.common}</h4>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Continent:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        </div>   
    `
    country_element.addEventListener('click', () => {
        display_country_details(country)
    }) 
    display_container.appendChild(country_element)    
    });
    
}

// Function to display detailed information about a selected country
function display_country_details(country){
    console.log(country)
    const display_container = document.querySelector('.display');
    display_container.innerHTML = ''

    const detailedInfoElement = document.createElement('div');
    detailedInfoElement.classList.add('detailed-info');
    detailedInfoElement.innerHTML = `
        <button class="back-btn">Back </button>
        <div class="info">
        <div class="detail-country-flag">
        <img src="${country.flags.png}" alt="${country.name.common}" class="flag">
        </div>
        
        
        <div class="details-info">
        <h2>${country.name.common}</h2>
        <br>
        <br>
        <p><strong>Continent/Region:</strong> ${country.region}</p>
        <br>
        <p><strong>Population:</strong> ${country.population}</p>
        <br>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <br>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <br>
        <p><strong>Currency:</strong> ${Object.keys(country.currencies)[0]}</p>
        <br>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        
        </div>
        </div>
    `
    detailedInfoElement.querySelector('.back-btn').addEventListener('click', () => {
    fetch_country()
});

display_container.appendChild(detailedInfoElement)
}

// search functionality
searchBtn.addEventListener('click', () => {
    const searchTerm = inputField.value.toLowerCase()
    const filteredData = countryData.filter(country => country.name.common.toLowerCase().includes(searchTerm))
    display_country_list(filteredData)
})


//Dark mode functionality
const dark_mode_btn = document.querySelector('.Dark')
const body = document.body

dark_mode_btn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
})

// filter countries functinality
function filterRegion(){
    const selectedRegion = filterRegionEl.value.toLowerCase()
    const filteredData= countryData.filter(country => country.region.toLowerCase().includes(selectedRegion));
    display_country_list(filteredData)
}
fetch_country()