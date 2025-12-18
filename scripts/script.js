const catImg = document.getElementsById('cat-img');
async function fetchCat() {
  catImg.src = "https://placehold.co/400x400?text-Fetching...";
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    catImg.src = data[0].url;
  } catch (error) {
    console.error('Oops, no cats today:', error);
  }
}

function setVibe(vibe) {
  catImg.className = '';
  catImg.className.add('vibe-' + vibe);
}

fetchCat();