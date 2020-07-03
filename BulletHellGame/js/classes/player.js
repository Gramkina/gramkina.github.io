class Player{

    canvas = null;

    x           = null;
    y           = null;
    size        = 40;
    speed       = 10;
    dashLength  = 150;
    life        = 3;
    immortality = 0;
    hitbox      = null;
    boost       = 0;

    playerHitBoxStart = null;

    up    = false;
    down  = false;
    left  = false;
    right = false;
    dash  = true;
    
    dashSprites        = new Image();
    dashRecoverySprite = new Image();
    dashReady          = new Audio('sound/dashReady.mp3');
    dashInit           = new Audio('sound/dash.mp3');
    dashFrame          = 0;
    dashRecoveryFrame  = 0;
    dashRecovery       = false;
    dashImmortality    = 60;
    hit                = new Audio('sound/hit.mp3');

    constructor(canvas){

        this.canvas = canvas;
        var coefWidth = canvas.width/1536;
        this.size *= coefWidth;
        this.speed *= coefWidth;
        this.dashLength *= coefWidth;
        this.hitbox = this.size*0.65;
        this.playerHitBoxStart = (this.size/2-this.hitbox/2);

        this.x = canvas.width/2-this.size/2;
        this.y = canvas.height/2-this.size/2;
        this.dashSprites.src = 'texture/dashSprites.svg';
        this.dashRecoverySprite.src = 'texture/dashRecovery.svg';

        $("body").keydown(function(e){
            if(e.keyCode == 39 || e.keyCode == 68) player.right = true;
            if(e.keyCode == 37 || e.keyCode == 65) player.left = true;
            if(e.keyCode == 38 || e.keyCode == 87) player.up = true;
            if(e.keyCode == 40 || e.keyCode == 83) player.down = true;
            if(e.keyCode == 16 && (player.up || player.down || player.left || player.right) && player.dash){
                player.dash = false;

                //  DASH IMMORTALITY
                if(player.immortality < 60)
                    player.immortality = 60;

                //  DASH
                var timer1 = setTimeout(function(){
                    timeouts.push(timer1);
                    if(player.up && !player.down && !player.left && !player.right) player.y-=(player.dashLength+player.size);
                    if(!player.up && player.down && !player.left && !player.right) player.y+=(player.dashLength+player.size);
                    if(!player.up && !player.down && player.left && !player.right) player.x-=(player.dashLength+player.size);
                    if(!player.up && !player.down && !player.left && player.right) player.x+=(player.dashLength+player.size);
                    if(player.up && !player.down && player.left && !player.right){ player.x-=(player.dashLength/2+player.size); player.y-=(player.dashLength/2+player.size);}
                    if(player.up && !player.down && !player.left && player.right){ player.x+=(player.dashLength/2+player.size); player.y-=(player.dashLength/2+player.size);}
                    if(!player.up && player.down && player.left && !player.right){ player.x-=(player.dashLength/2+player.size); player.y+=(player.dashLength/2+player.size);}
                    if(!player.up && player.down && !player.left && player.right){ player.x+=(player.dashLength/2+player.size); player.y+=(player.dashLength/2+player.size);}
                    
                    //  SOUND DASH
                    player.dashInit.volume = soundVolume/100;
                    player.dashInit.play();

                    //  DASH RECOVERY
                    var timer2 = setTimeout(function(){
                        timeouts.push(timer2);
                        player.dashRecovery = player.dashImmortality;
                        var timer3 = setTimeout(function(){ 
                            timeouts.push(timer3);
                            player.dashReady.volume = soundVolume/100; 
                            player.dashReady.play(); 
                            player.dashRecovery = false; 
                            player.dashRecoveryFrame = 0; 
                            player.dashFrame = 0; 
                            player.dash = true;
                            timeouts.splice(timeouts.indexOf(timer3), 1);
                        }, 1000/60*12);
                        timeouts.splice(timeouts.indexOf(timer2), 1);
                    }, 1000/60*168);
                    timeouts.splice(timeouts.indexOf(timer1), 1);
                }, 1000/60*8);
            }
        });

        $("body").keyup(function(e){
            if(e.keyCode == 39 || e.keyCode == 68) player.right = false;
            if(e.keyCode == 37 || e.keyCode == 65) player.left = false;
            if(e.keyCode == 38 || e.keyCode == 87) player.up = false;
            if(e.keyCode == 40 || e.keyCode == 83) player.down = false;
        });

        intervals.push(setInterval(function(){
            if(player.immortality != 0) player.immortality--;
        }, 1000/60));

        intervals.push(setInterval(function(){
            if(player.right || player.left || player.up || player.down){
                if(player.boost < 10) player.boost++;
            }
            else if(!player.right && !player.left && !player.up && !player.down){
                player.boost = 0;
            }
        }, 1000/45));

        intervals.push(setInterval(function(){
            if(status == "playing") score++;
        }, 1000/60));
    }

    move(){
        if(this.right){ if(this.x+this.speed*this.boost/10+this.size < this.canvas.width) this.x+=this.speed*this.boost/10; else this.x = this.canvas.width-this.size;};
        if(this.left){ if(this.x-this.speed*this.boost/10 > 0) this.x-=this.speed*this.boost/10; else this.x = 0;};
        if(this.up){ if(this.y-this.speed*this.boost/10 > 0) this.y-=this.speed*this.boost/10; else this.y = 0; };
        if(this.down){ if(this.y+this.speed*this.boost/10+this.size < this.canvas.height) this.y+=this.speed*this.boost/10; else this.y = this.canvas.height-this.size;};
    }

    damaged(){
        this.hit.volume = soundVolume/100;
        this.hit.play();
        this.immortality = 120;
        if(--this.life <= 0){
            status = "gameover";
            for(var i = 0; i<intervals.length; i++) clearInterval(intervals[i]);
            for(var i = 0; i<timeouts.length; i++) timeouts(timeouts[i]);
            clearInterval(difficultTimer);
            difficult = 0;
            enemy = [];
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }
}