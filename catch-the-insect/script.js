const screens =document.querySelectorAll('.screen');
const chooseInsectBtn =document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

//default values

let seconds =0;
let score=0;
let selectedInsect={};

startBtn.addEventListener('click', ()=>screens[0].classList.add('up'));

chooseInsectBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const img=btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedInsect={ src , alt};
        screens[1].classList.add('up');
        setTimeout(createInsect,1000);
        startGame();
    })
})

const startGame = function(){
    setInterval(increaseTime,1000)
}
const increaseTime= function(){
    let m=Math.floor(seconds / 60);
    let s =seconds % 60;
    m=m<10?`0${m}`:m
    s=s<10?`0${s}`:s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

const createInsect = function(){
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x , y } = getRandomLocation()
    insect.style.top =`${y}px`
    insect.style.left =`${x}px`
    insect.innerHTML =`<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random()*360}deg)"/>`
    console.log(selectedInsect.src, selectedInsect.alt, `${y}`, `${x}`)
    
    
    insect.addEventListener('click', catchInsect)

    gameContainer.appendChild(insect)
}

const getRandomLocation = function(){
    const width= window.innerWidth;
    const height= window.innerHeight;
    const x = Math.random()*(width-200)+100;
    const y = Math.random()*(height-200)+100;
    return {x,y};
}

const catchInsect = function(){
    increaseScore();
    this.classList.add('caught')
    setTimeout(()=>this.remove(),0)
    addInsects()
}

const addInsects = function(){
    setTimeout(createInsect,1000)
    setTimeout(createInsect,1500)
}

const increaseScore = function(){
    score++
    if(score>49){
        message.classList.add('visible');
    }
    scoreEl.innerHTML=`Score:${score}`
}