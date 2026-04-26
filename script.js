const cars = [
  {
    model: "Toyota Yaris 2016",
    type: "Hatchback",
    fuel: "Gasolina",
    year: 2016,
    price: 9900,
    transmission: "Automático"
  },
  {
    model: "Hyundai Accent 2015",
    type: "Sedán",
    fuel: "Gasolina",
    year: 2015,
    price: 8500,
    transmission: "Manual"
  },
  {
    model: "Nissan Qashqai 2014",
    type: "SUV",
    fuel: "Gasolina",
    year: 2014,
    price: 10800,
    transmission: "Automático"
  },
  {
    model: "Mitsubishi L200 2013",
    type: "Pickup",
    fuel: "Diésel",
    year: 2013,
    price: 11900,
    transmission: "Manual"
  },
  {
    model: "Kia Rio 2017",
    type: "Sedán",
    fuel: "Gasolina",
    year: 2017,
    price: 10300,
    transmission: "Automático"
  },
  {
    model: "Toyota Prius C 2016",
    type: "Hatchback",
    fuel: "Híbrido",
    year: 2016,
    price: 11500,
    transmission: "Automático"
  }
];

const grid = document.getElementById("cars-grid");
const countEl = document.getElementById("results-count");
const typeInput = document.getElementById("filter-type");
const fuelInput = document.getElementById("filter-fuel");
const priceInput = document.getElementById("filter-price");
const yearInput = document.getElementById("filter-year");

document.getElementById("year").textContent = new Date().getFullYear();

function formatPrice(value) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function cardTemplate(car) {
  return `
    <article class="card">
      <h3>${car.model}</h3>
      <p class="price">${formatPrice(car.price)}</p>
      <p class="meta">${car.type} · ${car.fuel} · ${car.year}</p>
      <span class="badge">${car.transmission}</span>
    </article>
  `;
}

function applyFilters() {
  const maxPrice = Number(priceInput.value) || Infinity;
  const minYear = Number(yearInput.value) || 0;

  const filtered = cars.filter((car) => {
    const matchType = !typeInput.value || car.type === typeInput.value;
    const matchFuel = !fuelInput.value || car.fuel === fuelInput.value;
    const matchPrice = car.price <= maxPrice;
    const matchYear = car.year >= minYear;

    return matchType && matchFuel && matchPrice && matchYear;
  });

  grid.innerHTML = filtered.length
    ? filtered.map(cardTemplate).join("")
    : "<p>No hay vehículos con esos filtros. Probá otra combinación.</p>";

  countEl.textContent = `${filtered.length} resultado(s)`;
}

[typeInput, fuelInput, priceInput, yearInput].forEach((input) => {
  input.addEventListener("input", applyFilters);
});

applyFilters();
