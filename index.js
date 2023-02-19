let button1 = document.querySelector('#button1') 
let button2 = document.querySelector('#button2')
let button3 = document.querySelector('#button3')
let karte = document.querySelector('.cards')
let zaehlen = 0

//Für selbe Karten
let gleiche = []
let vorher = {}
let speichern = []


//Events für die Buttons
button1.addEventListener("click", ()=>{
    karte.classList.add("zwei")
    karte.classList.remove("vier")
    karte.classList.remove("sechs")
    Render(4)
})

button2.addEventListener("click", ()=>{
    karte.classList.add("vier")
    karte.classList.remove("zwei")
    karte.classList.remove("sechs")
    Render(16)
})

button3.addEventListener("click", ()=>{
    karte.classList.add("sechs")
    karte.classList.remove("zwei")
    karte.classList.remove("vier")
    Render(36)
})

function Shuffle(z) {
    z.sort((a, b) => 0.5 - Math.random());
}

function Render(x) {

    let cardsType = []



    for(let i = 0; i < x/2; i++) {
        cardsType.push(i+1)
        cardsType.push(i+1)
    }
    //karten werden gemischt
    Shuffle(cardsType)

    karte.innerHTML=`${cardsType.map(card=>{
        return `<div class="box" type="${card}">
        <span class="inhalt">${card}</span>
        </div>`

    }).join('')}`
    let a = document.querySelectorAll('.box')

    for(let i = 0; i < a.length; i++) {
    
        a[i].addEventListener('click', ()=>{
            
            if(zaehlen === 0) {
                if(!speichern.includes(a[i])) {
                    zaehlen++
                a[i].classList.add('flip')
                a[i].children[0].classList.add('Zeigen')
                vorher = {zahl:a[i].children[0].textContent, vorher:a[i]}
                }              

                
            }
            else if(zaehlen < 2) {

                if(!speichern.includes(a[i])) {
                    a[i].classList.add('flip')
                    a[i].children[0].classList.add('Zeigen')

                if(vorher.zahl == a[i].children[0].textContent) {
                    zaehlen = 0
                    speichern.push(vorher.vorher, a[i])

                    if(speichern.length == cardsType.length) {
                        window.setTimeout(()=>{
                            alert('You Won!')
                            window.location.reload()}, 500)
                    }
                }

                else if(vorher.zahl != a[i].children[0].textContent) {

                    window.setTimeout(()=>{
                        zaehlen = 0
                        a[i].children[0].classList.remove('Zeigen')
                        vorher.vorher.children[0].classList.remove('Zeigen')
                        vorher.vorher.classList.remove('flip')
                        a[i].classList.remove('flip')
                    }, 1000)
                }
                }
                
            }
        })
    }
}
