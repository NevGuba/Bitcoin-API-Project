
const bitCoin = document.getElementById("btc")
const ethereum = document.getElementById("eth")
const dogeCoin = document.getElementById("doge")

//API to provide the data 
//https://docs.coinapi.io/market-data/rest-api/exchange-rates
let bitCoinUrl = 'https://rest.coinapi.io/v1/exchangerate/BTC/GBP'
let ethUrl = 'https://rest.coinapi.io/v1/exchangerate/ETH/GBP'
let dogeUrl = 'https://rest.coinapi.io/v1/exchangerate/DOGE/GBP'

// Sign up to API site to receive API key
let config = {
  headers: {
  'Accept': 'application/json',
  'X-CoinAPI-Key': '5DA14D1A-2D03-470A-9556-70F99E9935D2'
}}
// Axios simplifies the GET/Promise requests and allows us to put API keys into the headers
//https://axios-http.com/docs/intro

const f = new Intl.NumberFormat("en-GB",{ //format the rates into GBP
  currency: "GBP",
  style: "currency",
})
//Bitcoin
axios.get(bitCoinUrl, config)
  .then(function (response) {
    // handle success
    console.log(response);
      bitCoin.innerText = f.format(response.data.rate)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  //Ethereum
  axios.get(ethUrl, config)
  .then(function (response) {
    // handle success
    console.log(response);
      ethereum.innerText = f.format(response.data.rate)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  //Dogecoin
  axios.get(dogeUrl, config)
  .then(function (response) {
    // handle success
    console.log(response);
      dogeCoin.innerText = f.format(response.data.rate)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
 
const textDisplay = document.getElementById("typeWrite")
const phrases = ['Crypto ', 'Bitcoin ', 'Ethereum ', 'Litecoin ', 'Cardano ', 'Tether ']

let i = 0 
let j = 0
let currentPhrase = []
let isDeleting = false
let isEnd = false

function loop() {
  isEnd = false
  textDisplay.innerHTML = currentPhrase.join('')

  if (i < phrases.length) {

    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j])
      j++
      textDisplay.innerHTML = currentPhrase.join('')
    } 

    if(isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j])
      j--
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (j == phrases[i].length) {
      isEnd = true
      isDeleting = true
    }

    if (isDeleting && j === 0) {
      currentPhrase = []
      isDeleting = false
      i++
      if (i === phrases.length) {
        i = 0
      }
    }
  }
  const spedUp = Math.random() * (80 -50) + 50
  const normalSpeed = Math.random() * (300 -200) + 200
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()

// Hamburger Menu 
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".navMenu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".navLink").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))