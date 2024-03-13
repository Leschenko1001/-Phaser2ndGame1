var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    //parent=game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var worldWidth = config.width * 2;

function preload() {
    
    this.load.image('fon1', 'assets/fon1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
     //Створюємо фон плиткою
     this.add.tileSprite(0, 0, worldWidth, 1080, "fon1")
     .setOrigin(0, 0)
     .setScale(1)
     .setDepth(0);

      //Додаємо платформи
 platforms = this.physics.add.staticGroup();

 //platforms.create(550, 700, 'ground').setScale(2).refreshBody();

 //platforms.create(600, 400, 'ground');
 //platforms.create(50, 250, 'ground');
 //platforms.create(700, 220, 'ground');


 //Створення землі на всю ширину
 for (var x = 0; x < worldWidth; x = x + 384) {
     
     platforms
         .create(x, 1080 - 100, 'ground')
         .setOrigin(0, 0)
         .setDepth(100)
         .refreshBody();
 
 
//додаємо гравця
 player = this.physics.add.sprite(100, 450, 'dude');
 player.setBounce(0.2);
 player.setCollideWorldBounds(true);

 
 
 
    }   

    //додали зірки
    stars = this.physics.add.group({
        key: 'star',
        repeat: 111,
        setXY: { x: 12, y: 0, stepX: 90 }
    });

    
    

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    
}

function update() 
{
   
}
