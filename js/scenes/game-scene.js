class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    create() 
    {
        this.enemyFactory = new EnemyFactory(this, 1)
        
        this.add.image(0, 0, "maplvl1").setOrigin(0)

        this.tank = new Tank({scene: this, x: 0, y: 0})

        this.physics.add.overlap(this.tank, this.enemy1, this.winCallback)

        if (debugMode)
        {
            this.debugText = this.add.text(4, 4, "debugText")
            this.input.on("pointermove", (p)=> { this.debugText.setText(`${Math.floor(p.x)}x${Math.floor(p.y)}`)})
        }
    }
    
    handleTankDeath()
    {
        this.scene.start("LostScene")
    }

    update(t, d) 
    {
        this.enemyFactory.update(t, d)
    }
}