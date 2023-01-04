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

        // --- enemies ---
        this.load.spritesheet("helidrone", "assets/images/enemy-helidrone.png", {
            frameWidth: 16,
            frameHeight: 16,
            margin: 1,
            spacing: 2
        })

        this.load.spritesheet("bullet1", "assets/images/bullet1.png", {
            frameWidth: 8,
            frameHeight: 8,
            margin: 1,
            spacing: 2
        })
        this.load.spritesheet("bullet2", "assets/images/bullet2.png", {
            frameWidth: 10,
            frameHeight: 10,
            margin: 1,
            spacing: 2
        })
        
        this.load.image("smoke", "assets/images/smoke.png")
        this.load.image("maplvl1", "assets/images/map-lvl1.png")
    }

    create() 
    {
        let animRate = 8
        
        // --- tank anims ---
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
            frames: this.anims.generateFrameNumbers("helidrone", {
                start: 0,
                end: 3
            }),
            frameRate: animRate,
            repeat: -1
        })

        this.anims.create({
            key: "bullet1-shoot",
            frames: this.anims.generateFrameNumbers("bullet1", {
                start: 0,
                end: 1
            }),
            frameRate: animRate,
            repeat: -1
        })
        this.anims.create({
            key: "bullet2-shoot",
            frames: this.anims.generateFrameNumbers("bullet2", {
                start: 0,
                end: 3
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