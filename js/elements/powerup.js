class Powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, "powerup-" + type)
        
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.type = type || "ammo"
        this.setCollideWorldBounds(true)

        // collision
        this.scene.physics.add.overlap(this, this.scene.tank, this.collectCallback)
        this.anims.play("powerup-" + this.type)
        this.setVelocityY(-100) 
    }

    preUpdate(t, d) { super.preUpdate(t, d); this.update() }

    update() {
    }

    collectCallback(powerup, tank) {
        tank.loot(powerup)
        powerup.destroy()
    }
}

Powerup.types = [
    "ammo",
    "repair",
    "file"
]
Powerup.getRandomType = ()=> {
    let pows = Powerup.types
    let idx = Phaser.Math.Between(0, pows.length - 1)
    let ret = pows[idx]
    return ret
}