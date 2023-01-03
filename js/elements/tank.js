class Tank extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "tankbody")
        
        this.scene = config.scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this);

        this.setCollideWorldBounds(true)
        this.body.allowGravity = false

        this.x = gWidth/2
        this.y = gHeight - 9

        // --- movement ---
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.movVelocity = 100
        this.animationChangedFlag = 0
        this.currentDirection = 0

        // --- create turrent ---
        this.turrent = config.scene.add.sprite(0, 0, "tankturrent")
        this.turrent.setOrigin(0.3, 0.5)
        this.turrent.flipX = true
        this.turrent.flipY = true

        this.turrent.aimTo = { x: this.x - 10, y: this.y -5 }
        this.turrent.aimingToCursor = false
        this.scene.input.on("pointermove", (pointer)=> 
        {
            this.turrent.aimTo.x = pointer.x
            this.turrent.aimTo.y = pointer.y
            this.aimingToCursor = true
        })

        // --- particles ---
        this.smokeEmitter = this.scene.add.particles("smoke").createEmitter({
            x: this.x,
            y: this.y,
            speed: 20,
            angle: {min: 270, max: 360},
            scale: { start: 0.5, end: 1.5 },
            alpha: {start: 0.5, end: 0},
            lifespan: 400,
            gravityY: -300,
            frequency: 80
        })
        gdv = this.smokeEmitter

        this.playAnimation("stand")
    }

    playAnimation(animationName)
    {
        this.anims.play("tankbody-" + animationName)
        this.turrent.anims.play("tankturrent-" + animationName)
    }

    move(direction)
    {
        this.setVelocityX(this.movVelocity * direction)

        this.animationChangedFlag = this.currentDirection != direction
        if (this.animationChangedFlag) 
        {
            this.playAnimation(direction == 0 ? "stand" : "walk")
        }
        this.currentDirection = direction
    }

    preUpdate(t, d)
    {
        super.preUpdate(t, d)
        this.update()
    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.move(-1)
        }
        else if (this.cursors.right.isDown)
        {
            this.move(1)
        }
        else {
            this.move(0)
        }

        // --- smoke emitter ---
        this.smokeEmitter.setPosition(this.x + 18, this.y - 7)

        // --- turrent ---
        this.turrent.x = this.x + 1
        this.turrent.y = this.y - 5
        
        this.turrent.flipY = this.turrent.aimTo.x < this.x
        
        let ang = Phaser.Math.Angle.Between(
            this.turrent.x, 
            this.turrent.y,
            this.turrent.aimTo.x, 
            this.turrent.aimTo.y, 
        );

        this.turrent.rotation = ang
    }
}