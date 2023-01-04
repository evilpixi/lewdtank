class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config) {
        super(scene, x, y, config.texture)

        this.source = config?.source || "player"

        this.speedX = config?.speedX || 0
        this.speedY = config?.speedY || 0
        this.damage = config?.damage || 0
        
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.anims.play(config.texture + "-shoot")
    }

    hitTank()
    {
        if (this.source == "player") return

        this.scene.tank.getDamaged(this.damage)
        this.destroy()
    }
    
    hitEnemy(bullet, enemy)
    {
        enemy.getHit(this.damage)
        bullet.destroy()
    }

    preUpdate(t, d) { super.preUpdate(t, d); this.update() }

    update() {
        if (this.x <= 0 || this.x >= gWidth || this.y <= 0 || this.y >= gHeight) {
            this.destroy()
            return
        }

        this.setVelocityX(this.speedX)
        this.setVelocityY(this.speedY)
    }
}