let gWidth = 352
let gHeight = 224

// --------------------- DEBUG TOOLS --------------------- 
let debugMode = 1
var gdv

if (debugMode) {

}

// --------------------- GAME CONFIG --------------------- 
let gameConfig = {
    type: Phaser.WEBGL,
    scale: {
        parent: 'gameContainer',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gWidth,
        height: gHeight,
        min: { width: gWidth, height: gHeight }
    },
    autoStart: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: debugMode,
            gravity: {y: 400}
        }
    },
    render: {
        antialias: false
    },
    callbacks: {
        postBoot: (game)=> {
            game.scale.displaySize.setSnap(gWidth/2, gHeight/2)
            game.scale.refresh()
        }
    }
}

// --------------------- SCENES ---------------------

let game = new Phaser.Game(gameConfig)
game.scene.add("BootScene", BootScene)
game.scene.add("GameScene", GameScene)
game.scene.add("LostScene", LostScene)
game.scene.add("WinScene", WinScene)

game.scene.start("BootScene")