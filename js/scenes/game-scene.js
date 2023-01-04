class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    create() 
    {
        this.unlockedGirls = 0
        this.enemyFactory = new EnemyFactory(this, 1)
        
        this.add.image(0, 0, "maplvl1").setOrigin(0)

        this.tank = new Tank({scene: this, x: 0, y: 0})

        this.UITextUnlocked = this.add.text(4, 16, `Unlocked: 0/4`)
        this.UITextHP = this.add.text(4, 4, `HP: ${this.tank.hp}`)
        this.UITextAmmo = this.add.text(4, 28, `Ammo: ${this.tank.ammo}`)
    }
    
    handleTankDeath()
    {
        this.scene.start("LostScene")
    }

    unlockGirl()
    {
        this.unlockedGirls++
        let photo = this.add.image(0, 0, "photo" + this.unlockedGirls).setOrigin(0)
        this.tweens.add({
            targets: photo,
            delay: 200,
            duration: 200,
            alpha: 0,
            onComplete: ()=> { photo.destroy() }
        })
        
        if (this.unlockedGirls >= 4) {
            setTimeout(()=>{ this.scene.start("WinScene")}, 1000)
        }
    }

    update(t, d) 
    {
        this.enemyFactory.update(t, d)
    }
}