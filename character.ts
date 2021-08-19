namespace SpriteKind {
    export const PlayerAttack = create();
    export const PlayerArrow = create();
    export const EnemyAttack = create();
}


class Character {
    sprite: Sprite;
    renderable: scene.Renderable;
    heading: number;
    attackImage: Image;
    attackSprite: Sprite;

    constructor(isEnemy: boolean) {
        this.sprite = sprites.create(assets.image`playerImage`, isEnemy ? SpriteKind.Player : SpriteKind.Enemy);
        this.renderable = scene.createRenderable(10, (target: Image, camera: scene.Camera) => {
            this.drawHeading(target, camera);
        }, () => !(this.sprite.flags & SpriteFlag.Invisible));

        this.heading = 269;
        this.attackImage = image.create(32, 32);
        this.attackSprite = sprites.create(this.attackImage, isEnemy ? SpriteKind.PlayerAttack : SpriteKind.EnemyAttack);
        this.attackSprite.follow(this.sprite, 9999);
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
            3
        )
        target.drawLine(
            ox + Math.cos(angle) * radius,
            oy + Math.sin(angle) * radius,
            ox + Math.cos(angle - spread) * (radius - 3),
            oy + Math.sin(angle - spread) * (radius - 3),
            3
        )
    }

    destroy() {
        this.sprite.destroy();
        this.renderable.destroy();
        this.sprite = undefined;
        this.renderable = undefined;
    }
}