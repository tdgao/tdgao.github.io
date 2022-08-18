const clubs = document.querySelectorAll('.club');
const clubsContainer = document.getElementById('clubs');
const hiddenClubs = document.getElementById('hidden-clubs');

function getCategory(club){
  let cur = club.querySelector('.club-category').textContent;
  cur = cur.replace(/[\n\r]/g, '');
  cur = cur.trim();
  return cur;
}
function getAllCategories(){
  let categories = [];
  clubs.forEach(club => {
    const cur = getCategory(club)
    if (!categories.includes(cur)){
      categories.push(cur);
    }
  })
  console.log(categories);
  return categories;
}

// filter categories
const categories = document.querySelectorAll('.filter-category');
categories.forEach(tag => {
  tag.addEventListener("click", () => {
    tag.dataset.selected = (tag.dataset.selected === "true") ? 'false' : 'true';
    
    let selectedCategories = [];
    document.querySelectorAll('.filter-category[data-selected="true"]').forEach(category => selectedCategories.push(category.dataset.category));
    
    clubs.forEach(club => {
      const cur = getCategory(club);
      if ( selectedCategories.includes(cur) ){
        club.classList.remove('hidden-none');
      } else {
        club.classList.add('hidden-none');
      }
      
    })
  });
});




// search bar

async function getClubData() {
  const response = await fetch('/clubsdata.json');
  const data = await response.json();
  return data
}

async function fuseSearch(input){
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

  const clubsData = await getClubData();
  const fuse = new Fuse(clubsData.Clubs, options);
  const result = fuse.search(input);

  // return result filtered
  let clubs = [];
  result.forEach(club => {
    clubs.push(club.item["Club Name (Full Name please)"]); // pushes title
  });

  return clubs;
}


const search = document.getElementById('search');
search.addEventListener('input', () => {
  // search
  const input = search.value;
  fuseSearch(input).then( result => {
    // if no match found, display all clubs
    if (result.length == 0){
      clubs.forEach(club => {
        clubsContainer.appendChild(club);
      })
      return;
    }

    // move all clubs to hidden container / hide all clubs
    clubs.forEach(club => {
      hiddenClubs.appendChild(club);
    })

    // from container, querySelect each with title
    result.forEach(item => {
      const club = document.querySelector(`[data-club="${item}"]`);
      clubsContainer.appendChild(club);
    });
  });
  
});