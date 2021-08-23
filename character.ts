namespace SpriteKind {
    export const PlayerAttack = create();
    export const PlayerArrow = create();
    export const EnemyAttack = create();
    export const EnemyArrow = create();
}

let characters: Character[] = [];

game.onUpdate(() => {
    for (const char of characters) char.update();
})


enum Modifier {
    BouncyArrows = 1 << 0,
    SpinAttack = 1 << 1,
    DeflectOnWalls = 1 << 2,
    FastMove = 1 << 3,
    FastTurn = 1 << 4,
    ExtendedMelee = 1 << 5,
    MeleeProjectile = 1 << 6,
}

class Character {
    sprite: Sprite;
    renderable: scene.Renderable;
    heading: number;
    attackImage: Image;
    attackSprite: Sprite;
    script: ScriptBag;

    currentAction: Block;
    invincibleEndTime: number;

    modifiers: number;

    constructor(public isEnemy: boolean) {
        this.sprite = sprites.create(isEnemy ? assets.image`enemyImage` : assets.image`playerImage`, isEnemy ? SpriteKind.Enemy : SpriteKind.Player);
        this.renderable = scene.createRenderable(10, (target: Image, camera: scene.Camera) => {
            this.drawHeading(target, camera);
        }, () => !(this.sprite.flags & SpriteFlag.Invisible));

        this.sprite.data["character"] = this;

        this.heading = 269;
        this.attackImage = image.create(32, 32);
        this.attackSprite = sprites.create(this.attackImage, isEnemy ? SpriteKind.EnemyAttack : SpriteKind.PlayerAttack);
        this.attackSprite.setFlag(SpriteFlag.GhostThroughWalls, true);
        
        this.sprite.z = 10;
        this.attackSprite.z = 1;

        this.attackSprite.data["character"] = this;
        characters.push(this);
        let statusbar = statusbars.create(10, 1, StatusBarKind.Health)
        statusbar.attachToSprite(this.sprite, 1, 0)
        this.invincibleEndTime = 0;
        this.modifiers = 0;
    }

    update() {
        this.attackSprite.x = this.sprite.x;
        this.attackSprite.y = this.sprite.y;

        if (this.sprite.flags & sprites.Flag.Destroyed) {
            this.destroy();
        }
    }

    drawHeading(target: Image, camera: scene.Camera) {
        const ox = this.sprite.x - camera.drawOffsetX;
        const oy = this.sprite.y - camera.drawOffsetY;

        const angle = toRadians(this.heading);
        const spread = toRadians(30);
        const radius = 10;

        target.drawLine(
            ox + Math.cos(angle) * radius,
            oy + Math.sin(angle) * radius,
            ox + Math.cos(angle + spread) * (radius - 3),
            oy + Math.sin(angle + spread) * (radius - 3),
            this.isEnemy ? 6 : 3
        )
        target.drawLine(
            ox + Math.cos(angle) * radius,
            oy + Math.sin(angle) * radius,
            ox + Math.cos(angle - spread) * (radius - 3),
            oy + Math.sin(angle - spread) * (radius - 3),
            this.isEnemy ? 6 : 3
        )
    }

    destroy() {
        this.sprite.destroy();
        this.renderable.destroy();
        this.attackSprite.destroy();
        this.sprite = undefined;
        this.renderable = undefined;
        this.attackSprite = undefined;
        this.attackImage = undefined;
        characters.removeElement(this);
    }

    execute(cancellationToken: () => boolean) {
        while (true) {
            for (const action of this.script.current) {
                this.currentAction = action;
                this.attackSprite.data["action"] = action;
                executeAction(this, action);
                if (cancellationToken() || !this.sprite) return;
            }
        }
    }

    setModifier(modifier: Modifier, on: boolean) {
        if (on) this.modifiers |= modifier;
        else this.modifiers = ~(~this.modifiers | modifier);
    }

    hasModifier(modifier: Modifier) {
        return !!(this.modifiers & modifier);
    }
}