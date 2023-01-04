class LostScene extends Phaser.Scene 
{
    constructor() 
    {
        super("WinScene")
    }

    create() 
    {
        this.input.on("pointerdown", ()=> {
            this.scene.start("GameScene")
        })

        this.add.image(gWidth*0.25, gHeight*0.25, "photo1").setScale(0.4)
        this.add.image(gWidth*0.25, gHeight*0.75, "photo2").setScale(0.4)
        this.add.image(gWidth*0.75, gHeight*0.25, "photo3").setScale(0.4)
        this.add.image(gWidth*0.75, gHeight*0.75, "photo4").setScale(0.4)
        
        this.add.text(gWidth/2, gHeight/2, "YOU WON!\nclick to restart")
        .setOrigin(0.5)

    }

    update() 
    {
        
    }
}