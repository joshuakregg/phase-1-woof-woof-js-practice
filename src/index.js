const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const dogBtn = document.getElementById('good-dog-filter')
function fetchDogs() {
fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => data.forEach(element => {

      const span = document.createElement('span')
      span.innerText = element.name
      
        dogBar.appendChild(span)
        span.addEventListener('click', () => handleSpanClick(element) )
    }))
}

function handleSpanClick(element) {
            console.log("this is the element inside of handleSpanClick callback function: ", element)
    
    dogInfo.innerHTML = ""
    console.log('clicked')
    fetch(`http://localhost:3000/pups/${element.id}`)
    .then(res => res.json())
    .then(dat => {
        const img = document.createElement('img')
        img.src = dat.image
        const h2 = document.createElement('h2')
        h2.innerText = dat.name
        const btn = document.createElement('button')
        btn.innerText = dat.isGoodDog? 'is good dog!' : 'bad dog :('
        dogInfo.appendChild(img)
        dogInfo.appendChild(h2)
        dogInfo.appendChild(btn)
        btn.addEventListener('click', event => {
            
            event.preventDefault()
             if (btn.innerText === 'is good dog!') {
                btn.innerText = 'bad dog :('
                fetch(`http://localhost:3000/pups/${element.id}`,{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                    },
                    body: JSON.stringify({
                        "name": element.name,
                        "image": element.image,
                        "isGoodDog": false
                })
                })
            } else {
                btn.innerText = 'is good dog!'
                fetch(`http://localhost:3000/pups/${element.id}`,{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                    },
                    body: JSON.stringify({
                        "name": element.name,
                        "image":element.image,
                        "isGoodDog": true
                })
                })
            }
        })
    })
}

function dogCard(elementID) {}
fetchDogs()
// when i click filter dogs it should turn on and filter all the bad dogs from the span list
dogBtn.addEventListener('click',() =>{
if (dogBtn.innerText === "Filter good dogs: OFF") {
    dogBtn.innerText = "Filter good dogs: ON"
    dogBar.innerHTML= ''
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(data => {
        const filterDogs = data.filter((element) => element.isGoodDog )
        console.log(filterDogs)
        
// for each dog in filter dogs put dog into a span element and append the span element to dogBar
        filterDogs.forEach(element => {
            const filteredSpan = document.createElement('span')
            filteredSpan.innerText = element.name
            filteredSpan.addEventListener('click', () => handleSpanClick(element))
            dogBar.appendChild(filteredSpan)
        })
        })




} else {
    dogBar.innerHTML = ''
    dogBtn.innerText = "Filter good dogs: OFF"
    fetchDogs()
}
})