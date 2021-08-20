class Arrow {
    sprite: Sprite;
    _heading: number;

    constructor(character: Character, public speed: number) {
        this.sprite = sprites.create(image.create(16, 16), character.isEnemy ? SpriteKind.EnemyArrow : SpriteKind.PlayerArrow);
        this.sprite.x = character.sprite.x;
        this.sprite.y = character.sprite.y;
        this.heading = character.heading;

        this.sprite.vx = Math.cos(toRadians(this.heading)) * speed;
        this.sprite.vy = Math.sin(toRadians(this.heading)) * speed;
        this.sprite.data["_arrow"] = this;
        this.sprite.data["character"] = character;
        this.sprite.data["action"] = character.currentAction;
        this.sprite.setFlag(SpriteFlag.DestroyOnWall, true);
    }

    set heading(val: number) {
        this._heading = val;
        this.renderArrow();
    }

    get heading() {
        return this._heading
    }

    renderArrow() {
        const ox = this.sprite.width >> 1;
        const oy = this.sprite.height >> 1;

        this.sprite.image.fill(0);
        const angle = toRadians(this._heading);

        drawThickLine(
            this.sprite.image,
            ox - Math.cos(angle) * 2,
            oy - Math.sin(angle) * 2,
            ox - Math.cos(angle) * 4,
            oy - Math.sin(angle) * 4,
            11
        );

        this.sprite.image.drawLine(
            Math.round(ox + Math.cos(angle) * 4),
            Math.round(oy + Math.sin(angle) * 4),
            Math.round(ox - Math.cos(angle) * 4),
            Math.round(oy - Math.sin(angle) * 4),
            14
        );

        drawThickLine(
            this.sprite.image,
            ox + Math.cos(angle) * 4,
            oy + Math.sin(angle) * 4,
            ox + Math.cos(angle) * 4,
            oy + Math.sin(angle) * 4,
            1
        )
    }
}