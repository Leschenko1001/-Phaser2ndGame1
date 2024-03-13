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
 player.setCollideWorldBounds(false);
 player.setDepth(5)

 this.cameras.main.setBounds(0, 0, worldWidth, 1080);
 this.physics.world.setBounds(0, 0, worldWidth, 1080);

 this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
 //додали курсор 
 cursors = this.input.keyboard.createCursorKeys();
 
 
    }   

    //додали зірки
    stars = this.physics.add.group({
        key: 'star',
        repeat: 111,
        setXY: { x: 12, y: 0, stepX: 90 }
    });
    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });
    
    

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
}
//scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

function update() {

    //Додали керування персонажем
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
     else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } 
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-480);
    }
     
    {
       // if (gameOver) {
          //  return;
       // }
}
}
//Додали збираня зірок
function collectStar(player, star) 
{
    star.disableBody(true, true);
    
}