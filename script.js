'use strict';
const searchBar = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cityInfo = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cityInfo.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cityInfo);
  console.log(this.value);
  const searchResults = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      return ` 
    <li>
    <span class="name">${cityName}, ${stateName}</span>
    </li>`;
    })
    .join('');
  suggestions.innerHTML = searchResults;
}

searchBar.addEventListener('keyup', displayMatches);
