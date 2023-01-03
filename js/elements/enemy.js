class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, config) {
        super(scene, x, y, "generic-enemy")
        
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)

        //this
    }

    preUpdate(t, d) { super.preUpdate(t, d); this.update() }

    update() {
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