class Bullet{

    enemy  = null;

    x      = null;
    y      = null;
    size   = null;
    speed  = null;
    cos    = null;
    sin    = null;
    hitbox = null;

    constructor(enemy, size, speed, cos, sin){
        this.enemy = enemy;
        var coefWidth = enemy.canvas.width/1536;
        this.x = this.enemy.x;
        this.y = this.enemy.y;
        this.size = size * coefWidth;
        this.hitbox = this.size*0.75;
        this.speed = speed*coefWidth;
        this.cos = cos;
        this.sin = sin;
    }

}