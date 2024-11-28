
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const fromcurr = document.querySelector(".from select");

const tocurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (let key in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = key;
    newOption.value = key;
    if (select.name === "from" && key === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && key === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value; 
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
  
  try {
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate;
    
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;

  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Failed to fetch exchange rate. Please try again later.";
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // it prevent form submission ,(like if when we click on convert btn page will not reload )
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});















































