const url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const priceTag = document.querySelector('h1')
const spanTag = document.querySelector('p span')
let currency = "USD"

// function to grab data from coindesk

const checkPrice = function() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1)
    })
}
// run on load
checkPrice()

// loop over every nav link and add a click event
const navLinks = document.querySelectorAll('nav a')
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    currency = this.getAttribute('data-currency')
    checkPrice()
    
    //remove all previous selected states
    navLinks.forEach(link => link.classList.remove('selected'))
    
    // and then only do it for the clicked link
    this.classList.add('selected')
    
    //update the spantag
    spanTag.innerHTML = currency
  })
})

// check the price every 60 seconds
setInterval(function () {
  checkPrice()
}, 600000)



