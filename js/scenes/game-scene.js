class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    create() 
    {
        this.add.image(0, 0, "maplvl1").setOrigin(0)

        this.tank = new Tank({scene: this, x: 0, y: 0})
    }

    update() 
    {
        
    }
}