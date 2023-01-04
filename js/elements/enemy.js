class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, config) {
        super(scene, x, y, name)
        
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.dropRate = 1

        this.setCollideWorldBounds(true)
    }

    preUpdate(t, d) { super.preUpdate(t, d); this.update(t, d) }

    update() {
    }

    drop() {
        if (Math.random() > 0.5) {
            let drop = new Powerup(this.scene, this.x, this.y, Powerup.getRandomType())
        }
    }
}

class Helidrone extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "helidrone")
        this.type = "helidrone"
        this.body.allowGravity = false

        this.direction = x > gWidth / 2 ? -1 : 1
        this.flySpeed = 30
        this.damage = 40
        this.hp = 40
        this.dropRate = this.scene.enemyFactory.dropRate * 0.7

        this.anims.play("helidrone-fly")

        this.shootCooldown = 2200
        this.cooldown = this.shootCooldown
    }

    shoot()
    {
        this.cooldown = this.shootCooldown
        let bullet = new Bullet(this.scene, this.x, this.y + 8, {
            texture: "bullet1",
            source: "enemy",
            speedX: 0,
            speedY: 60,
            damage: this.damage
        })

        this.scene.physics.add.overlap(bullet, this.scene.tank, ()=> { bullet.hitTank() })
    }

    getHit(damage)
    {
        let dur = 300
        this.setTintFill(0xff0000)
        this.scene.tweens.addCounter({
            delay: 100,
            from: 0,
            to: 255,
            duration: dur,
            onUpdate: (tween)=>
            {
                const value = Math.floor(tween.getValue());
                this.setTint(Phaser.Display.Color.GetColor(255, value, value));
            }
        });

        this.hp -= damage

        if (this.hp <= 0) {
            this.drop()
            this.destroy()
        }
    }

    update(t, d) {
        this.setVelocityX(this.direction * this.flySpeed)

        if (this.x <= 8.5 || this.x >= gWidth - 8.5)
        {
            this.destroy()
            this.enemyFactory.enemyCount--
        }

        // --- shoot ---
        this.cooldown -= d
        if (this.cooldown <= 0)
        {
            this.shoot()
        }
    }
}