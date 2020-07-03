class Enemy{

    canvas = null;
    player = null;

    x       = null;
    y       = null;
    size    = 0;
    maxSize = 60;
    prepare = false;
    isAttack  = false;
    attackCount = 4;

    img        = new Image();
    prepareImg = new Image();
    attackImg  = new Image();
    attackSound = new Audio('sound/attackEnemy.mp3');
    lazerAttack = false;
    lazerSize = 8;
    lazerPrepareStatus = false;
    lazerPrepare = true;

    constructor(canvas, player){
        this.canvas = canvas;
        this.player = player;

        this.maxSize *= this.canvas.width/1536; 
        this.lazerSize *= this.canvas.width/1536;
        this.img.src        = 'texture/enemy.svg';
        this.prepareImg.src = 'texture/prepareEnemy.svg';
        this.attackImg.src  = 'texture/attackEnemy.svg';

    }

    bullet = [];

    spawn(){
        var thisEnemy = this;
        this.x = Math.random()*(this.canvas.width-this.maxSize)+this.maxSize/2;
        this.y = Math.random()*(this.canvas.height-this.maxSize)+this.maxSize/2;
        this.prepare = true;
        var prepareTimer = setInterval(function(){
            if(status == "playing"){
                if((thisEnemy.size+=0.5*thisEnemy.canvas.width/1536) >= thisEnemy.maxSize){
                    intervals.splice(intervals.indexOf(prepareTimer), 1);
                    clearInterval(prepareTimer);
                    thisEnemy.prepare = false;
                    thisEnemy.attack(Math.round(Math.random()*(thisEnemy.attackCount-1)));
                }
            }
        }, 1000/60);
        intervals.push(prepareTimer);
    }

    attack(attackNumber){
        switch(attackNumber){
            case 0:{this.attack1(); break;}
            case 1:{this.attack2(); break;}
            case 2:{this.attack3(); break;}
            case 3:{this.attack4(); break;}
        }
    }

    attack1(){
        var thisEnemy = this;
        var bulletCount = Math.random()*5+5;
        var timer1 = setTimeout(function(){
            if(status == "playing"){
                timeouts.push(timer1);

                thisEnemy.isAttack = true;
                var angles = thisEnemy.getAngles();
                for(var i = 0; i<bulletCount; i++){
                    thisEnemy.bullet.push(new Bullet(thisEnemy, Math.random()*10+10, Math.random()*5+10, angles.cos+Math.random()*0.2-0.1, angles.sin+Math.random()*0.2-0.1));
                }  

                var timer2 = setTimeout(function(){
                    if(status == "playing"){
                        timeouts.push(timer1);
                        thisEnemy.isAttack = false;
                        thisEnemy.attackSound.play();
                        timeouts.splice(timeouts.indexOf(timer2), 1);
                    }
                }, 1000/60*5); 
                        
                var bulletTimer = setInterval(function(){
                    if(status == "playing"){
                        if(thisEnemy.clearBullet()){
                            intervals.splice(intervals.indexOf(bulletTimer), 1);
                            clearInterval(bulletTimer);
                            thisEnemy.vanishing();
                        }
                        for(var i = 0; i<thisEnemy.bullet.length; i++){
                            thisEnemy.bullet[i].x += thisEnemy.bullet[i].cos*thisEnemy.bullet[i].speed;
                            thisEnemy.bullet[i].y += thisEnemy.bullet[i].sin*thisEnemy.bullet[i].speed;
                            thisEnemy.isDamaged(i)
                        }
                    }
                }, 1000/60);
                intervals.push(bulletTimer);

                timeouts.splice(timeouts.indexOf(timer1), 1);
            }
        }, 1000/60*120);
        
    }

    attack2(){
        var thisEnemy = this;
        var ang = 0;
        var process = true;
        var attackCount = 0;
        var attack2Timer = setInterval(function(){
            if(status == "playing"){
                var timer3 = setTimeout(function(){
                    if(status == "playing"){
                        timeouts.push(timer3);
                        if(attackCount <= 5){
                            thisEnemy.isAttack = true;
                            for(var i = 0; i<4; i++){
                                thisEnemy.bullet.push(new Bullet(thisEnemy, 15, 10, ang+(i%4)/2*Math.PI, ang+(i%4)/2*Math.PI));
                            }
                            var timer4 = setTimeout(function(){
                                if(status == "playing"){
                                    timeouts.push(timer3);
                                    thisEnemy.isAttack = false;
                                    thisEnemy.attackSound.play();
                                    timeouts.splice(timeouts.indexOf(timer4), 1);
                                }
                            }, 1000/60*5);

                            ang+=Math.PI/10;
                            attackCount++;
                        }
                        else{
                            process = false;
                            intervals.splice(intervals.indexOf(attack2Timer), 1);
                            clearInterval(attack2Timer);
                        }
                        timeouts.splice(timeouts.indexOf(timer3), 1);
                    }
                }, 1000/60*120);
            }
        }, 1000/60*60);
        intervals.push(attack2Timer);

        var bulletTimer = setInterval(function(){
            if(status == "playing"){
                thisEnemy.clearBullet();
                if(!process && thisEnemy.bullet.length == 0){
                    intervals.splice(intervals.indexOf(bulletTimer), 1);
                    clearInterval(bulletTimer);
                    thisEnemy.vanishing();
                }

                for(var i = 0; i<thisEnemy.bullet.length; i++){
                    thisEnemy.bullet[i].x += Math.cos(thisEnemy.bullet[i].cos)*thisEnemy.bullet[i].speed;
                    thisEnemy.bullet[i].y += Math.sin(thisEnemy.bullet[i].sin)*thisEnemy.bullet[i].speed;
                    thisEnemy.isDamaged(i);
                }
            }
        }, 1000/60);
        intervals.push(bulletTimer);
    }

    attack3(){
        var thisEnemy = this;
        var timer5 = setTimeout(function(){
            if(status == "playing"){
                timeouts.push(timer5);
                thisEnemy.isAttack = true;
                var angles = thisEnemy.getAngles();
                thisEnemy.bullet.push(new Bullet(thisEnemy, 60, 3, angles.cos+Math.random()*0.2-0.1, angles.sin+Math.random()*0.2-0.1));
                var timer6 = setTimeout(function(){
                    if(status == "playing"){
                        timeouts.push(timer6);
                        thisEnemy.isAttack = false;
                        thisEnemy.attackSound.play();
                        timeouts.splice(timeouts.indexOf(timer6), 1);
                    }
                }, 1000/60*5); 
                
                var bulletTimer = setInterval(function(){
                    if(status == "playing"){
                        if(thisEnemy.clearBullet()){
                            intervals.splice(intervals.indexOf(bulletTimer), 1);
                            clearInterval(bulletTimer);
                            thisEnemy.vanishing();
                        }
                        if(thisEnemy.bullet.length > 0){
                            thisEnemy.bullet[0].x += thisEnemy.bullet[0].cos*thisEnemy.bullet[0].speed;
                            thisEnemy.bullet[0].y += thisEnemy.bullet[0].sin*thisEnemy.bullet[0].speed;
                            thisEnemy.isDamaged(0);
                        }
                    }
                }, 1000/60);
                intervals.push(bulletTimer);
                timeouts.splice(timeouts.indexOf(timer5), 1);
            }
        }, 1000/60*120);
    }

    attack4(){
        var thisEnemy = this;
        setTimeout(function(){
            thisEnemy.lazerAttack = true;
            thisEnemy.lazerPrepare = true;
            setTimeout(function(){
                thisEnemy.lazerPrepareStatus = !thisEnemy.lazerPrepareStatus;
                setTimeout(function(){
                    thisEnemy.lazerPrepareStatus = !thisEnemy.lazerPrepareStatus;
                    setTimeout(function(){
                        thisEnemy.lazerPrepareStatus = !thisEnemy.lazerPrepareStatus;
                        setTimeout(function(){
                            thisEnemy.lazerPrepareStatus = !thisEnemy.lazerPrepareStatus;
                            setTimeout(function(){

                                thisEnemy.lazerPrepare = false;
                                thisEnemy.isAttack = true;

                                var timer7 = setTimeout(function(){
                                    if(status == "playing"){
                                        timeouts.push(timer7);
                                        thisEnemy.isAttack = false;
                                        thisEnemy.attackSound.play();
                                        timeouts.splice(timeouts.indexOf(timer7), 1);
                                    }
                                }, 1000/60*5); 

                                var intervalLazer = setTimeout(function(){
                                    if(status == "playing"){
                                        timeouts.push(intervalLazer);
                                        thisEnemy.lazerAttack = false;
                                        thisEnemy.vanishing();
                                        timeouts.splice(timeouts.indexOf(intervalLazer), 1);
                                    }
                                }, 1000/60*300);

                                var lazerDamageTimer = setInterval(function(){
                                    if(status == "playing" && thisEnemy.lazerAttack){
                                        thisEnemy.isLazerDamaged();
                                    }
                                    else{ 
                                        intervals.splice(intervals.indexOf(lazerDamageTimer), 1); 
                                        clearInterval(lazerDamageTimer);
                                    }
                                }, 1000/60);
                                intervals.push(lazerDamageTimer);

                            }, 1000/60*30);
                        }, 1000/60*30);
                    }, 1000/60*30);
                }, 1000/60*30);
            }, 1000/60*30);
        }, 1000);
    }

    getAngles(){
        var directionX = (this.player.x+this.player.size/2)-(this.x+this.size/2);
        var directionY = (this.player.y+this.player.size/2)-(this.y+this.size/2);
        var gip = Math.sqrt(directionX*directionX+directionY*directionY);
        var cos = directionX/gip;
        var sin = directionY/gip;
        return {cos, sin};
    }

    clearBullet(){
        if(this.bullet.length == 0) return true;
        for(var i = 0; i<this.bullet.length; i++)
            if(this.bullet[i].x+this.bullet[i].size < 0 || this.bullet[i].x-this.bullet[i].size > this.canvas.width || this.bullet[i].y+this.bullet[i].size < 0 || this.bullet[i].y-this.bullet[i].size > this.canvas.height)
                this.bullet.splice(i, 1);
        return false;
    }

    isDamaged(i){
        var bulletHitBoxX1 = this.bullet[i].x-this.bullet[i].hitbox/2;
        var bulletHitBoxX2 = this.bullet[i].x+this.bullet[i].hitbox/2;
        var bulletHitBoxY1 = this.bullet[i].y-this.bullet[i].hitbox/2;
        var bulletHitBoxY2 = this.bullet[i].y+this.bullet[i].hitbox/2;

        var playerHitBoxX1 = this.player.x+this.player.playerHitBoxStart;
        var playerHitBoxX2 = playerHitBoxX1+this.player.hitbox;
        var playerHitBoxY1 = this.player.y+this.player.playerHitBoxStart;
        var playerHitBoxY2 = playerHitBoxY1+this.player.hitbox;

        if(bulletHitBoxX2 > playerHitBoxX1 && bulletHitBoxX1 < playerHitBoxX2 && bulletHitBoxY1 < playerHitBoxY2 && bulletHitBoxY2 > playerHitBoxY1 && this.player.immortality == 0){
            this.player.damaged();
        }
    }

    vanishing(){
        var thisEnemy = this;
        var vanishEnemy = setInterval(function(){
            if(status == "playing"){
                if((thisEnemy.size-=1*thisEnemy.canvas.width/1536) <= 0){
                    intervals.splice(intervals.indexOf(vanishEnemy), 1);
                    clearInterval(vanishEnemy);
                    thisEnemy.spawn();
                }
            }
        }, 1000/60);
        intervals.push(vanishEnemy);
    }

    isLazerDamaged(){
        var playerHitBoxX1 = this.player.x+this.player.playerHitBoxStart;
        var playerHitBoxX2 = playerHitBoxX1+this.player.hitbox;
        var playerHitBoxY1 = this.player.y+this.player.playerHitBoxStart;
        var playerHitBoxY2 = playerHitBoxY1+this.player.hitbox;

        if(((playerHitBoxX2 > this.x-this.lazerSize/2 && playerHitBoxX1 < this.x+this.lazerSize/2) || (playerHitBoxY1 < this.y+this.lazerSize/2 && playerHitBoxY2 > this.y-this.lazerSize/2)) && this.player.immortality == 0)
            this.player.damaged();
    }

}