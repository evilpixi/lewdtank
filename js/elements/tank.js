class Tank extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "tankbody")
        
        this.scene = config.scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.body.allowGravity = false

        // --- game data ---
        this.hp = 100
        this.ammo = 20

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

        this.g = this.scene.add.graphics()

        this.scene.input.on("pointerdown", (pointer)=> {
            if (this.ammo <= 0) {
                console.log("OUT OF AMMO")
                return
            }
            this.ammo--

            let origin = this.turrent.getRightCenter()

            this.g.clear()
            this.g.lineBetween(origin.x, origin.y, pointer.x, pointer.y)

            let bulletSpeed = 100
            let angle = Phaser.Math.Angle.Between(origin.x, origin.y, pointer.x, pointer.y)

            let bullet = new Bullet(this.scene, origin.x, origin.y, {
                texture: "bullet2",
                source: "player",
                speedX: bulletSpeed * Math.cos(angle),
                speedY: bulletSpeed * Math.sin(angle),
                damage: 50
            })
            let enemies = this.scene.enemyFactory.group
            this.scene.physics.add.overlap(bullet, enemies, bullet.hitEnemy)
        })

        gdv = this.scene.physics

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

    getDamaged(damage)
    {
        return
        this.hp -= damage
        if (this.hp <= 0) {
            this.scene.handleTankDeath()
        }
    }

    preUpdate(t, d)
    {
        super.preUpdate(t, d)
        this.update()
    }

    shoot()
    {

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