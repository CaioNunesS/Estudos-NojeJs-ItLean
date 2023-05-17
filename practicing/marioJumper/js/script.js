const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
let countScore = 0
// let testeJump
let ponto = 1

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump')

        if (pipe.offsetLeft > 120 && !checkCollision()) {
            countScore++
            // for (let i = 0; i < countScore; i++) {
                
            //     if(countScore % 3 == 0){
            //         document.querySelector(".pipe").style.animation -= "pipe-animation 1.5s infinite linear"
            //     }
            // }
        }
        document.getElementById('score').innerHTML =  Number(countScore)
    }, 500)
}

function checkCollision() {
    
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if (pipePosition > 0 && pipePosition <= 120 && marioPosition < 80) {
        return true
    }
    return false
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')


    if (pipePosition > 0 && pipePosition <= 120 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        console.log('pipe', pipePosition);

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        console.log('mario', marioPosition);

        mario.src = "images/game-over.webp"

        clearInterval(loop);
        console.log('score no if', score);
        document.getElementById('reset').hidden = false
    }
}, 10);

function restart() {
    window.location.reload()
}

document.addEventListener('keydown', jump);
