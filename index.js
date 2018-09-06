
var content = document.getElementById('cont');
var startbtn = document.getElementById('startgame');
var fooddiv = document.getElementsByClassName('food');
var losediv = document.getElementById('lose');
var score = document.getElementById('score-cont');
var overscore = document.getElementById('over-score-cont');
var backbtn = document.getElementById('back');
var speedbtn = document.getElementById('speed');
var speedList = document.getElementsByClassName('speed-self');
var pausebtn = document.getElementsByClassName('playing')[0];
var highscore = document.getElementById('highscore');
var moveInt;
var hscore = 0;
var speedBool = true;
init();
//存储游戏信息
function init() {
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = Math.floor(Math.random() * Math.floor(mapW / 20));
    this.foodY = Math.floor(Math.random() * Math.floor(mapH / 20));
    this.snakeW = 20;
    this.snakeH = 20;
    this.snake = [[2, 0, 'head'], [1, 0, 'body'], [0, 0, 'body']];
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    this.dir = 'right';
    this.myscore = 0;
    this.losegame = false;
    this.speed = 500;
    this.playBool = false;
    this.audio = new Audio();
    this.audio.src = './img/music.mp3';
    this.eataudio = new Audio();
    this.eataudio.src='./img/eat.mp3';
    this.losemusic = new Audio();
    this.losemusic.src = './img/lose.mp3';
}
controlSpeed();
function playgame() {
    this.playBool = true;
    music(playBool);
    getfood();
    getsnake();
    bindEvent();
    pause();
    music(this.playBool);
    moveInt = setInterval(function () {
        startgame();
        console.log(1)
    }, this.speed);
   

}
startbtn.onclick = function () {
    startbtn.style.display = 'none';
    playgame();
}
function getfood() {
    var food = document.createElement('div');
    food.style.position = 'absolute';
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    food.classList.add('food');
    content.appendChild(food);
}
function getsnake() {
    for (var i = 0; i < this.snake.length; i++) {
        var snakedom = document.createElement('div');
        snakedom.style.position = 'absolute';
        snakedom.style.height = this.snakeH + 'px';
        snakedom.style.width = this.snakeW + 'px';
        snakedom.style.left = this.snake[i][0] * 20 + 'px';
        snakedom.style.top = this.snake[i][1] * 20 + 'px';
        snakedom.classList.add(this.snake[i][2]);
        content.appendChild(snakedom).classList.add('snake');
        switch (dir) {
            case 'left':
                snakedom.style.transform = 'rotate(180deg)';
                break;
            case 'right':
                break;
            case 'up':
                snakedom.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snakedom.style.transform = 'rotate(90deg)';
                break;
        }
    }
}

function startgame() {
    for (var i = this.snake.length - 1; i > 0; i--) {
        this.snake[i][0] = this.snake[i - 1][0];
        this.snake[i][1] = this.snake[i - 1][1];
    }
    automove();
    removeClass('snake');
    getsnake();
    eatfood();
    lose();
}
function removeClass(classname) {
    var ele = document.getElementsByClassName(classname);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}
function automove() {
    switch (this.dir) {
        case 'left':
            this.snake[0][0] -= 1;
            break;
        case 'right':
            this.snake[0][0] += 1;
            break;
        case 'up':
            this.snake[0][1] -= 1;
            break;
        case 'down':
            this.snake[0][1] += 1;
    }
}
function setDir(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
                this.dir = 'left';
            };
            break;
        case 38:
            if (this.up) {
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = true;
                this.dir = 'up';
            };
            break;
        case 39:
            if (this.right) {
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
                this.dir = 'right';
            };
            break;
        case 40:
            if (this.down) {
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = true;
                this.dir = 'down';
                console.log('down')
            };
            break;
    }
    getsnake();
}
function bindEvent() {
    document.onkeydown = function (e) {
        setDir(e.keyCode);

    }
}
function eatfood() {
    var odivL = parseInt(fooddiv[0].style.left);
    var odivT = parseInt(fooddiv[0].style.top);
    if (this.snake[0][0] * 20 == odivL && this.snake[0][1] * 20 == odivT) {
        this.eataudio.currentTime = 0.38;
        this.eataudio.play();
        switch (this.dir) {
            case 'left':
                this.snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1], 'body']);
                break;
            case 'right':
                this.snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1], 'body']);
                break;
            case 'up':
                this.snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1, 'body']);
                break;
            case 'down':
                this.snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1, 'body']);
                break;
        }
        this.myscore += 1;
        score.innerHTML = this.myscore;
        removeClass('food');
        this.foodX = Math.floor(Math.random() * Math.floor(mapW / 20));
        this.foodY = Math.floor(Math.random() * Math.floor(mapH / 20));
        getfood();
    }

}
function lose() {
    if (snake[0][1] * 20 < 0 || snake[0][1] * 20 > mapH || snake[0][0] * 20 < 0 || snake[0][0] * 20 > mapW) {
        this.losegame = true;
    };
    for (var i = 1; i < this.snake.length; i++) {
        if (this.snake[i][0] == this.snake[0][0] && this.snake[i][1] == this.snake[0][1]) {
            this.losegame = true;
        }
    }
    if (this.losegame) {
        clearInterval(moveInt);
        music(false);
        this.losemusic.play();
        overscore.innerHTML = this.myscore;
        if(this.myscore > hscore){
            hscore = this.myscore;
        }
        highscore.innerHTML =hscore;
        losediv.style.display = 'block';
        removeClass('snake');
        removeClass('food');
        this.myscore = 0;
        playBool = false;
        replay();
    }
}
function replay() {
    var tthis = this;
    backbtn.onclick = function () {
        tthis.losemusic.pause();
        tthis.losemusic.currentTime = 0;
        losediv.style.display = 'none';
        startbtn.style.display = 'block';
        score.innerHTML = 0;
        init();
    }
}
function controlSpeed() {
    var tthis = this;
    speedbtn.onclick = function () {
        if (speedBool) {
            for (var i = 0; i < speedList.length; i++) {
                speedList[i].style.display = 'block';
            }
            speedBool = false;
            for (var i = 0; i < speedList.length; i++) {
                (function (n) {
                    speedList[n].onclick = function () {
                        switch (n) {
                            case 0:
                                tthis.speed = 500;
                                break;
                            case 1:
                                tthis.speed = 300;
                                break;
                            case 2:
                                tthis.speed = 100;
                                break;
                        }
                        if (playBool) {
                            clearInterval(moveInt);
                            moveInt = setInterval(function () {
                                startgame();
                            }, tthis.speed);
                        }
                        for (var i = 0; i < speedList.length; i++) {
                            speedList[i].style.display = 'none';
                        }
                        speedBool = true;
                    }
                })(i)
            }
        } else if (!speedBool) {
            for (var i = 0; i < speedList.length; i++) {
                speedList[i].style.display = 'none';
            }
            speedBool = true;
        }

    }
}
function pause() {
    var tthis = this;
    pausebtn.onclick = function () {
        if (tthis.playBool) {
            clearInterval(moveInt);
            pausebtn.innerHTML = 'continue';
            tthis.playBool = false;
            music(false);
        } else if (!tthis.playBool) {
            playgame();
            pausebtn.innerHTML = 'pause';
            tthis.playBool = true;
        }
    }
}
function music(bool){
    if(bool){
        this.audio.play();
    }else if(!bool){
        this.audio.pause();
    }
}