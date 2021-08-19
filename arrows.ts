class Arrow {
    sprite: Sprite;

    constructor(x: number, y: number, public speed: number, protected _heading: number) {
        this.sprite = sprites.create(image.create(16, 16), SpriteKind.PlayerArrow);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.vx = Math.cos(toRadians(_heading)) * speed;
        this.sprite.vy = Math.sin(toRadians(_heading)) * speed;
        this.renderArrow();
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
        )

        this.sprite.image.drawLine(
            Math.round(ox + Math.cos(angle) * 4),
            Math.round(oy + Math.sin(angle) * 4),
            Math.round(ox - Math.cos(angle) * 4),
            Math.round(oy - Math.sin(angle) * 4),
            14
        )

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

game.onUpdateInterval(500, () => {
    new Arrow(80, 60, 30, Math.randomRange(0, 359))
})