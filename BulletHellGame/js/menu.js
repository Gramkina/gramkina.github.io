$(function(){

    soundMenu = new Audio('sound/click.mp3');
    play = new Image();
    play.src = 'texture/play.svg';
    options = new Image();
    options.src = 'texture/options.svg';
    music = new Image();
    music.src = 'texture/music.svg';
    sound = new Image();
    sound.src = 'texture/sound.svg';
    back = new Image();
    back.src = 'texture/back.svg';
    gameoverImg = new Image();
    gameoverImg.src = 'texture/gameover.svg';
    scoreImg = new Image();
    scoreImg.src = 'texture/score.svg';
    menuSelection = 0;
    menuNumber = 0;


    $("body").keydown(function(e){
        if(status == "menu"){
            if((e.keyCode == 83 || e.keyCode == 40) && menuSelection < 1 && menuNumber == 0){ playSound(); menuSelection++;}
            if((e.keyCode == 87 || e.keyCode == 38) && menuSelection > 0){ playSound(); menuSelection--;}
            if(e.keyCode == 13 && menuSelection == 1 && menuNumber == 0){ playSound(); menuNumber = 1; menuSelection = 0; }
            if(e.keyCode == 13 && menuSelection == 0 && menuNumber == 0){ playSound(); startGame(); }
            if((e.keyCode == 83 || e.keyCode == 40) && menuSelection < 2 && menuNumber == 1){ playSound(); menuSelection++;}
            if(e.keyCode == 13 && menuSelection == 2 && menuNumber == 1){ playSound(); menuNumber = 0; menuSelection = 0; }
            if((e.keyCode == 68 || e.keyCode == 39) && menuSelection == 0 && menuNumber == 1 && musicVolume < 100){ playSound(); musicVolume+=1; }
            if((e.keyCode == 65 || e.keyCode == 37) && menuSelection == 0 && menuNumber == 1 && musicVolume > 0){ playSound(); musicVolume-=1; }
            if((e.keyCode == 68 || e.keyCode == 39) && menuSelection == 1 && menuNumber == 1 && soundVolume < 100){ playSound(); soundVolume+=1; }
            if((e.keyCode == 65 || e.keyCode == 37) && menuSelection == 1 && menuNumber == 1 && soundVolume > 0){ playSound(); soundVolume-=1; }
        }
        else if(status == "playing"){
            if(e.keyCode == 27){ /* */ }
        }
        else if(status == "gameover"){
            if(e.keyCode == 13 && menuNumber == 0 && menuSelection == 0){ status="menu"; }
        }
    });

    function playSound(){
        soundMenu.volume = soundVolume/100;
        soundMenu.play();
    }

    function startGame(){
        score = 0;
        backgroundMusic.loop = true;
        backgroundMusic.volume = musicVolume/100;
        backgroundMusic.play();

        player = new Player(canvas);
        difficult = 0;
        difficultTimer = setInterval(function(){
            if(difficult++ % 1800 == 0){
                enemy.push(new Enemy(canvas, player));
                enemy[enemy.length-1].spawn();
            }
        }, 1000/60);

        status = "playing";
    }

});