class EnemyFactory {
    constructor(scene, level) {
        this.enemyCount = 0
        this.levelData = levels[level-1]
        this.scene = scene

        this.group = this.scene.add.group()

        this.timeUntilNextEnemy = 0

        this.factory = {
            "helidrone": ()=> {
                let dir = Math.random() > 0.5 ? -1 : 1
                let x = dir == -1 ? gWidth - 10 : 10
                let y = Phaser.Math.Between(9, 176)

                let helidrone = new Helidrone(this.scene, x, y)
                this.group.add(helidrone)
                return helidrone
            }
        }
    }

    update(t, d) {
        if (this.timeUntilNextEnemy <= 0 && this.enemyCount < this.levelData.maxEnemies)
        {
            this.timeUntilNextEnemy = this.levelData.genCooldown
            this.createEnemy()
        }
        else {
            this.timeUntilNextEnemy -= d
        }
    }

    createEnemy() {
        let enemyList = this.levelData.enemies
        let enemyType = enemyList[Math.floor(Math.random()*enemyList.length)];

        let newEnemy = this.factory[enemyType]()
        newEnemy.enemyFactory = this
        
        this.enemyCount++
    }
}

let levels = [
    {
        enemies: ["helidrone"],
        maxEnemies: 500,
        dropRate: 0.5,
        genCooldown: 3000,
        spots: [
            { x: 39, y: 121 },
            { x: 169, y: 39 },
            { x: 296, y: 40 }
        ]
    }
]