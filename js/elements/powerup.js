class Powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, config) {
        super(scene, x, y, name)
        
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)

        // collision
        this.scene.physics.add.overlap(this, this.scene.tank, this.collectCallback)
    }

    preUpdate(t, d) { super.preUpdate(t, d); this.update() }

    update() {
    }

    collectCallback(powerup, enemy) {
        console.log("please replace me")
    }
}

class Helidrone extends Enemy {
    constructor(scene, x, y, name) {
        super(scene, x, y, "helidrone")
        this.type = "helidrone"

        this.anims.play("helidrone-fly")

    }

    update() {
        console.log("tatiii")
    }
}