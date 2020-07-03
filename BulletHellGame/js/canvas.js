$(function(){
    coefScaleX = canvas.width/1536;
    coefScaleY = canvas.height/754;

    hearthImage = new Image();
    hearthImage.src = 'texture/hearth.svg';
    bulletImage = new Image();
    bulletImage.src = 'texture/bullet.svg';
    hitboxImg = new Image();
    hitboxImg.src = 'texture/hitbox.svg';
    lazerImg = new Image();
    lazerImg.src = 'texture/lazer.svg';

    function step() {
        c2d.clearRect(0, 0, canvas.width, canvas.height);
        if(status == "menu"){
            switch(menuNumber){
                case 0:{
                    c2d.drawImage(play, menuSelection == 0 ? 0 : 270, 0, 270, 130, canvas.width/2-270*coefScaleX/2, canvas.height/2-130*coefScaleY, 270*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(options, menuSelection == 1 ? 0 : 420, 0, 420, 130, canvas.width/2-420*coefScaleX/2, canvas.height/2, 420*coefScaleX, 130*coefScaleY);
                break;}
                case 1:{
                    c2d.drawImage(music, menuSelection == 0 ? 0 : 320, 0, 320, 130, canvas.width/2-840*coefScaleX/2, canvas.height/2-195*coefScaleY, 320*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(sound, menuSelection == 1 ? 0 : 350, 0, 350, 130, canvas.width/2-840*coefScaleX/2, canvas.height/2-65*coefScaleY, 350*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(back, menuSelection == 2 ? 0 : 290, 0, 290, 130, canvas.width/2-350*coefScaleX/2, canvas.height/2+65*coefScaleY, 290*coefScaleX, 130*coefScaleY);
                    c2d.beginPath();
                    c2d.fillStyle = "#621529";
                    c2d.rect(canvas.width/2, canvas.height/2-138*coefScaleY, 500*coefScaleX, 16*coefScaleY);
                    c2d.rect(canvas.width/2, canvas.height/2-8*coefScaleY, 500*coefScaleX, 16*coefScaleY);
                    c2d.fill();
                    c2d.beginPath();
                    c2d.fillStyle = "#E93B69";
                    c2d.arc(canvas.width/2+500*musicVolume/100*coefScaleX, canvas.height/2-130*coefScaleY, 25*coefScaleX, Math.PI, 3*Math.PI);
                    c2d.arc(canvas.width/2+500*soundVolume/100*coefScaleX, canvas.height/2, 25*coefScaleX, Math.PI, 3*Math.PI);
                    c2d.fill();
                break;}
            }

        }
        else if(status == "pause"){
            switch(menuNumber){
                case 0:{
                    c2d.drawImage(pauseImg, 0, 0, 360, 130, canvas.width/2-360*coefScaleX/4, 20*coefScaleY, 360*coefScaleX/2, 130*coefScaleY/2);
                    c2d.drawImage(continueImg, menuSelection == 0 ? 0 : 490, 0, 490, 130, canvas.width/2-490*coefScaleX/2, canvas.height/2-195*coefScaleY, 490*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(restartImg, menuSelection == 1 ? 0 : 450, 0, 450, 130, canvas.width/2-450*coefScaleX/2, canvas.height/2-65*coefScaleY, 450*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(options, menuSelection == 2 ? 0 : 420, 0, 420, 130, canvas.width/2-420*coefScaleX/2, canvas.height/2+65*coefScaleY, 420*coefScaleX, 130*coefScaleY);
                break;}
                case 1:{
                    c2d.drawImage(music, menuSelection == 0 ? 0 : 320, 0, 320, 130, canvas.width/2-840*coefScaleX/2, canvas.height/2-195*coefScaleY, 320*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(sound, menuSelection == 1 ? 0 : 350, 0, 350, 130, canvas.width/2-840*coefScaleX/2, canvas.height/2-65*coefScaleY, 350*coefScaleX, 130*coefScaleY);
                    c2d.drawImage(back, menuSelection == 2 ? 0 : 290, 0, 290, 130, canvas.width/2-350*coefScaleX/2, canvas.height/2+65*coefScaleY, 290*coefScaleX, 130*coefScaleY);
                    c2d.beginPath();
                    c2d.fillStyle = "#621529";
                    c2d.rect(canvas.width/2, canvas.height/2-138*coefScaleY, 500*coefScaleX, 16*coefScaleY);
                    c2d.rect(canvas.width/2, canvas.height/2-8*coefScaleY, 500*coefScaleX, 16*coefScaleY);
                    c2d.fill();
                    c2d.beginPath();
                    c2d.fillStyle = "#E93B69";
                    c2d.arc(canvas.width/2+500*musicVolume/100*coefScaleX, canvas.height/2-130*coefScaleY, 25*coefScaleX, Math.PI, 3*Math.PI);
                    c2d.arc(canvas.width/2+500*soundVolume/100*coefScaleX, canvas.height/2, 25*coefScaleX, Math.PI, 3*Math.PI);
                    c2d.fill();
                break;}
            }
        }
        else if(status == "gameover"){
            c2d.drawImage(gameoverImg, 0, 0, 570, 130, canvas.width/2-570/2*coefScaleX, 20*coefScaleY, 570*coefScaleX, 130*coefScaleY);
            c2d.drawImage(scoreImg, 0, 0, 340, 130, canvas.width/2-400*coefScaleX, canvas.height/2-130*coefScaleY, 340*coefScaleX, 130*coefScaleY);
            c2d.drawImage(back, 0, 0, 290, 130, canvas.width/2-290/2*coefScaleX, canvas.height/2+100*coefScaleY, 290*coefScaleX, 130*coefScaleY);
            c2d.fillStyle = "#E93B69";
            c2d.font = 96*coefScaleY+"px Gugi";
            c2d.fillText(score, canvas.width/2+100*coefScaleX, canvas.height/2-30*coefScaleY);
        }
        else if(status == "playing"){
            player.move();

            //  PLAYER
            if(!hitboxMode){
                if(!player.dash && player.dashFrame < 14) c2d.drawImage(player.dashSprites, 100*player.dashFrame++, 0, 100, 100, player.x, player.y, player.size, player.size);
                else if(!player.dash && player.dashFrame == 14 && !player.dashRecovery) c2d.drawImage(player.dashSprites, 100*player.dashFrame, 0, 100, 100, player.x, player.y, player.size, player.size);
                else if(!player.dash && player.dashRecovery && player.dashRecoveryFrame < 11) c2d.drawImage(player.dashRecoverySprite, 100*player.dashRecoveryFrame++, 0, 100, 100, player.x, player.y, player.size, player.size);
                else if(player.dash && !player.dashRecovery) c2d.drawImage(player.dashSprites, 0, 0, 100, 100, player.x, player.y, player.size, player.size);
            }else{
                c2d.drawImage(hitboxImg, player.x+player.playerHitBoxStart, player.y+player.playerHitBoxStart, player.hitbox, player.hitbox);
            }

            //  IMMORTALITY
            c2d.beginPath();
            c2d.strokeStyle = "#4952A0";
            c2d.lineWidth = 5*coefScaleX;
            c2d.arc(player.x+player.size/2, player.y+player.size/2, 30*coefScaleX, -Math.PI/2, 1.5*Math.PI+(2*Math.PI-player.immortality*2*Math.PI/120), true);
            c2d.stroke();

            //  ENEMY BULLET
            for(i = 0; i<enemy.length; i++){
                enemy[i].bullet.forEach(function(bullet, i, arr){
                    if(!hitboxMode){
                        c2d.drawImage(bulletImage, bullet.x-bullet.size/2, bullet.y-bullet.size/2, bullet.size, bullet.size);
                    }else{
                        c2d.drawImage(hitboxImg, bullet.x-bullet.hitbox/2, bullet.y-bullet.hitbox/2, bullet.hitbox, bullet.hitbox);
                    }
                });
            }

            //  LAZER
            for(i = 0; i<enemy.length; i++){
                if(enemy[i].lazerAttack){
                    if(enemy[i].lazerPrepare){
                        c2d.beginPath();
                        c2d.fillStyle = enemy[i].lazerPrepareStatus ? "#E3E3E3" : "#42131F";
                        c2d.rect(0, enemy[i].y-enemy[i].lazerSize/2, canvas.width, enemy[i].lazerSize);
                        c2d.rect(enemy[i].x-enemy[i].lazerSize/2, 0, enemy[i].lazerSize, canvas.height);
                        c2d.fill();
                    }else{
                        c2d.beginPath();
                        c2d.fillStyle = "#EE3969";
                        c2d.rect(0, enemy[i].y-enemy[i].lazerSize/2, canvas.width, enemy[i].lazerSize);
                        c2d.rect(enemy[i].x-enemy[i].lazerSize/2, 0, enemy[i].lazerSize, canvas.height);
                        c2d.fill();
                    }
                }
            }

            //  ENEMY
            for(i = 0; i<enemy.length; i++){
                if(enemy[i].prepare) c2d.drawImage(enemy[i].prepareImg, enemy[i].x-enemy[i].size/2, enemy[i].y-enemy[i].size/2, enemy[i].size, enemy[i].size);
                else if(enemy[i].isAttack) c2d.drawImage(enemy[i].attackImg, enemy[i].x-enemy[i].size/2, enemy[i].y-enemy[i].size/2, enemy[i].size, enemy[i].size);
                else c2d.drawImage(enemy[i].img, enemy[i].x-enemy[i].size/2, enemy[i].y-enemy[i].size/2, enemy[i].size, enemy[i].size);
            }

            //  HP
            for(i = 0; i<player.life; i++){
                c2d.drawImage(hearthImage, 15+i*55*coefScaleX, canvas.height-56*coefScaleY, 47*coefScaleX, 41*coefScaleY);
            }

        }
        
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
});