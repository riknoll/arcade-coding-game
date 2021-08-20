function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

function distanceSquaredBetweenSprites(a: Sprite, b: Sprite) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

function drawThickLine(image: Image, x0: number, y0: number, x1: number, y1: number, color: number) {
    // Rounding produces better results when dealing with some angles
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    image.drawLine(x0, y0, x1, y1, color);
    image.drawLine(x0 + 1, y0, x1 + 1, y1, color);
    image.drawLine(x0 - 1, y0, x1 - 1, y1, color);
    image.drawLine(x0, y0 + 1, x1, y1 + 1, color);
    image.drawLine(x0, y0 - 1, x1, y1 - 1, color);
}

function getCharacterData(sprite: Sprite): Character {
    return sprite.data["character"];
}

function findClosestSprite(sprite: Sprite, others: Sprite[]) {
    let min = 0;
    let closest: Sprite;

    for (const otherSprite of others) {
        const current = distanceSquaredBetweenSprites(sprite, otherSprite);
        if (current < min) {
            min = current;
            closest = otherSprite;
        }
    }
    return closest;
}