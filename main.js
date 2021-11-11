const choices = document.querySelector('.choices')
const play = document.querySelectorAll('.play')
const title = document.querySelectorAll('.title')[1]

const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors')
const choice = document.querySelectorAll('.choice')
const choiceImages = ['images/rock.svg', 'images/paper.png', 'images/scissors.png']
const result = document.querySelector('.result')
const btReset = document.querySelector('.reset')

let myPlay = 0
let pcPlay = 0
let gif = 0

title.addEventListener('click', () => {
    board2()
})

choice.forEach((choice)=>{
    choice.addEventListener('click', (event)=>{
        const rps = event.target.classList[1]
        if(rps == 'rock') {
            myPlay = 1
        } else if(rps=='paper'){
            myPlay = 2
        } else if(rps=='scissors'){
            myPlay = 3
        }
        pcPlay = parseInt((Math.random() * 3) + 1)

        console.log(`My play ${myPlay} x PCplay ${pcPlay}`);

        board3()
    })
})

function board2() {
    title.style.pointerEvents = 'none'
    title.classList.toggle('bt-title')
    title.innerText = 'Choose Wisely!!'

    choice.forEach((choice)=>{
        choice.style.pointerEvents = 'all'
        choice.style.cursor = 'pointer'
    })
    choices.style.opacity = 1
    play.forEach(element => {
        element.style.opacity = 1
    })
}

function board3() {

    choice.forEach((choice)=>{
        choice.style.pointerEvents = 'none'
    })
    // choices.style.opacity = 1
    play[0].style.backgroundImage = `url("${choiceImages[myPlay-1]}")`
    play[1].style.backgroundImage = `url("${choiceImages[pcPlay-1]}")`
    play.forEach(element => {
        element.style.filter = 'invert(1)'
    })

    let match = winnerDecider(myPlay, pcPlay)
    let path = window.location.href.slice(0, window.location.href.length - 11)
    gif = parseInt((Math.random() * 4) + 1)
    console.log(`match: ${match}`);
    if(match == -1) {
        result.src = `${path}/images/draw${gif}.gif`
        console.log('draw');
    }else if(match) {
        result.src = `${path}/images/win${gif}.gif`
        console.log('win');
    } else {
        result.src = `${path}/images/fail${gif}.gif`
        console.log('fail');
    }

    setTimeout(()=>{
        // result.style.display = 'initial'
        result.style.opacity = 1
        result.style.width = '60vw'
        result.style.height = '70vh'
        result.style.border = '2px solid gray'
        result.style.top = 'calc(50% - 35vh)'
        result.style.left = 'calc(50% - 30vw)'
        btReset.style.opacity = 1
        btReset.style.cursor = 'pointer'
    }, 2000)
}

function reset() {
    result.style.opacity = 0
    result.style.width = '1vw'
    result.style.height = '1vh'
    result.style.border = 'none'
    result.style.top = '50%'
    result.style.left = '50%'
    btReset.style.opacity = 0
    btReset.cursor = 'default'

    choices.style.opacity = 0
    play.forEach(element => {
        element.style.opacity = 0
        element.style.background = 'url(images/interrogation.gif) no-repeat'
        element.style.backgroundSize = 'contain'
    })

    title.classList.toggle('bt-title')
    title.innerText = 'Start??'
    title.style.pointerEvents = 'all'

    myPlay = 0
    pcPlay = 0
}

function winnerDecider(player, pc) {
    if(player==1 && pc==3){
        //player wins
        return true
    }else if(player==2 && pc==1) {
        //player wins
        return true
    }else if(player==3 && pc==2) {
        //player wins
        return true
    }else if(pc==1 && player==3) {
        //pc wins
        return false
    }else if(pc==2 && player==1) {
        //pc wins
        return false
    }else if(pc==3 && player==2) {
        //pc wins
        return false
    }else if(player == pc) {
        return -1
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
