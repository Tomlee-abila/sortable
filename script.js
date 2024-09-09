let heroes = [];
let filteredHeroes = [];
let currentPage = 1;
let pageSize = 20;
let currentSortColumn = 'name';
let ascendingOrder = true;

// Fetch superhero data
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
  .then(response => response.json())
  .then(data => {
    heroes = data;
    filteredHeroes = [...heroes];
    sortHeroes(currentSortColumn); // Sort by name initially
    renderTable();
    updatePageInfo();
  })
  .catch(err => console.error('Failed to fetch superhero data:', err));

// Utility to render the table based on current page and page size
const renderTable = () => {
  const tableBody = document.querySelector("#heroesTable tbody");
  tableBody.innerHTML = ''; // Clear the table

  const start = (currentPage - 1) * pageSize;
  const end = pageSize === 'all' ? filteredHeroes.length : start + pageSize;
  const heroesToShow = filteredHeroes.slice(start, end);
  
  heroesToShow.forEach(hero => {
    const row = document.createElement("tr");
    
    // Displaying Icon
    const iconCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = hero.images.xs;
    iconCell.appendChild(img);
    row.appendChild(iconCell);

    // Displaying other fields
    row.innerHTML += `
      <td>${hero.name}</td>
      <td>${hero.biography.fullName || 'N/A'}</td>
      <td>
        Intelligence: ${hero.powerstats.intelligence}, Strength: ${hero.powerstats.strength}, Speed: ${hero.powerstats.speed}, 
        Durability: ${hero.powerstats.durability}, Power: ${hero.powerstats.power}, Combat: ${hero.powerstats.combat}
      </td>
      <td>${hero.appearance.race || 'Unknown'}</td>
      <td>${hero.appearance.gender}</td>
      <td>${hero.appearance.height.join(", ")}</td>
      <td>${hero.appearance.weight.join(", ")}</td>
      <td>${hero.biography.placeOfBirth || 'Unknown'}</td>
      <td>${hero.biography.alignment}</td>
    `;

    tableBody.appendChild(row);
  });
};

// Pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
    updatePageInfo();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  if ((currentPage * pageSize) < filteredHeroes.length) {
    currentPage++;
    renderTable();
    updatePageInfo();
  }
});

const updatePageInfo = () => {
  document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${Math.ceil(filteredHeroes.length / pageSize)}`;
};

// Handling search
const searchInput = document.getElementById('searchInput');
const searchField = document.getElementById('searchField');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const field = searchField.value;
  
  filteredHeroes = heroes.filter(hero => {
    const fieldValue = getField(hero, field);
    return fieldValue && fieldValue.toLowerCase().includes(searchTerm);
  });

  currentPage = 1; // Reset to the first page
  renderTable();
  updatePageInfo();
});

// Handling page size selection
const pageSizeSelect = document.getElementById('pageSize');
pageSizeSelect.addEventListener('change', (e) => {
  pageSize = e.target.value === 'all' ? 'all' : parseInt(e.target.value);
  currentPage = 1; // Reset to first page
  renderTable();
  updatePageInfo();
});

// Sorting logic
const sortHeroes = (field) => {
  filteredHeroes.sort((a, b) => {
    let aField = getField(a, field);
    let bField = getField(b, field);

    if (aField == null) return 1;
    if (bField == null) return -1;

    if (typeof aField === 'string') aField = aField.toLowerCase();
    if (typeof bField === 'string') bField = bField.toLowerCase();

    if (aField < bField) return ascendingOrder ? -1 : 1;
    if (aField > bField) return ascendingOrder ? 1 : -1;
    return 0;
  });

  ascendingOrder = !ascendingOrder; // Toggle order for next click
  renderTable();
};

// Get field values
const getField = (hero, field) => {
  switch (field) {
    case 'name': return hero.name;
    case 'fullName': return hero.biography.fullName;
    case 'race': return hero.appearance.race;
    case 'gender': return hero.appearance.gender;
    case 'placeOfBirth': return hero.biography.placeOfBirth;
    case 'alignment': return hero.biography.alignment;
    default: return null;
  }
};

// Sorting when table headers are clicked
document.querySelectorAll('th').forEach((header, index) => {
  header.addEventListener('click', () => {
    const field = header.textContent.toLowerCase().replace(' ', '');
    currentSortColumn = field;
    sortHeroes(field);
  });
});
