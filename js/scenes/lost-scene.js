class LostScene extends Phaser.Scene 
{
    constructor() 
    {
        super("LostScene")
    }

    create() 
    {
        this.add.text(gWidth/2, gHeight/2, "YOU LOST!\nclick to restart")
        .setOrigin(0.5)

        this.input.on("pointerdown", ()=> {
            this.scene.start("GameScene")
        })
    }

    update() 
    {
        
    }
}