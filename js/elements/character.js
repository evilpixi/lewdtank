class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "tankbody")
        
        this.scene = config.scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true)
    }

    update() {
        
    }
}