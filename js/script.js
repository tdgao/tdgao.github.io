// search bar

async function getClubData() {
  const response = await fetch('../clubsdata.js');
  const data = await response.json();
  return data
}

function fuseSearch(input){
  const options = {
    keys: [
      {
        name: 'Club Name (Full Name please)',
        weight: 0.7
      },
      {
        name: 'Club Description',
        weight: 0.5
      },
      {
        name: 'New Club',
        weight: 0.3
      },
      {
        name: 'Main Contact Name',
        weight: 0.1
      },
    ]
  }
  
  const fuse = new Fuse(books, options);
  
  return fuse.search(input);
}


const search = document.getElementById('search');
const clubs = document.querySelectorAll('.club');
const clubsData = getClubData(); // note: chance of not getting response in time

search.addEventListener('input', () => {
  // search

});