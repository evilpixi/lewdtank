class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    create() 
    {
        this.add.image(0, 0, "maplvl1").setOrigin(0)

        this.tank = new Tank({scene: this, x: 0, y: 0})

        this.enemy1 = new Helidrone(this, 100, 200)

        this.physics.add.overlap(this.tank, this.enemy1, this.winCallback)
    }
    
    winCallback(player, enemy)
    {
        console.log("enemy is", enemy)
        console.log("player is", player)
    }

    update() 
    {
        
    }
}