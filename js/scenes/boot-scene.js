class BootScene extends Phaser.Scene 
{
    constructor() 
    {
        super("BootScene")
    }

    preload() 
    {
        this.load.spritesheet("tankbody", "assets/images/tank-body.png", {
            frameWidth: 32,
            frameHeight: 16,
            margin: 1,
            spacing: 2
        })
        this.load.spritesheet("tankturrent", "assets/images/tank-turrent.png", {
            frameWidth: 32,
            frameHeight: 16,
            margin: 1,
            spacing: 2
        })
        this.load.image("char", "assets/images/char.png")
        this.load.spritesheet("generic-enemy", "assets/images/generic-enemy.png", {
            frameWidth:16,
            frameHeight: 16
        })
        
        this.load.image("smoke", "assets/images/smoke.png")
        this.load.image("maplvl1", "assets/images/map-lvl1.png")
        this.load.image("bg-forest", "assets/images/bg-forest.png")
    }

    create() 
    {
        let animRate = 8
        
        this.anims.create({
            key: "tankbody-stand",
            frames: this.anims.generateFrameNumbers("tankbody", {
                start: 0,
                end: 1
            }),
            frameRate: animRate,
            repeat: -1
        })
        this.anims.create({
            key: "tankbody-walk",
            frames: this.anims.generateFrameNumbers("tankbody", {
                start: 1,
                end: 2
            }),
            frameRate: animRate,
            repeat: -1
        })

        this.anims.create({
            key: "tankturrent-stand",
            frames: this.anims.generateFrameNumbers("tankturrent", {
                start: 1,
                end: 1
            }),
            frameRate: animRate,
            repeat: -1
        })
        this.anims.create({
            key: "tankturrent-walk",
            frames: this.anims.generateFrameNumbers("tankturrent", {
                start: 1,
                end: 2
            }),
            frameRate: animRate,
            repeat: -1
        })

        // --- enemy anims ---
        this.anims.create({
            key: "helidrone-fly",
            frames: this.anims.generateFrameNumbers("generic-enemy", {
                start: 0,
                end: 0
            }),
            frameRate: animRate,
            repeat: -1
        })


        this.scene.start("GameScene")
    }

    update() 
    {
        
    }
}

var gTile = 16