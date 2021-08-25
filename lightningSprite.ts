class LightningSprite extends Sprite {
    angle: number;
    distance: number;
    constructor(public x0: number, public y0: number, public x1: number, public y1: number) {
        super(img`1`);
        this.angle = Math.atan2(this.y1 - this.y0, this.x1 - this.x0);
        this.distance = Math.sqrt((this.x1 - this.x0) ** 2 + (this.y1 - this.y0) ** 2);
        
    }

    __drawCore(camera: scene.Camera) {

        let prevx = this.x0;
        let prevy = this.y0;

        let newx = this.x0;
        let newy = this.y0;
        const step = 5;

        let angleRange = 10;

        for (let i = 0; i < this.distance; i += step) {
            const tempAngle = this.angle + toRadians(Math.randomRange(-angleRange, angleRange));
            angleRange -= 0.5
            newx = (this.x0 + i * Math.cos(tempAngle)) | 0
            newy = (this.y0 + i * Math.sin(tempAngle)) | 0;
            screen.drawLine(prevx - camera.drawOffsetX, prevy - camera.drawOffsetY, newx - camera.drawOffsetX, newy - camera.drawOffsetY, 4);
            prevx = newx;
            prevy = newy
        }
        screen.drawLine(prevx - camera.drawOffsetX, prevy - camera.drawOffsetY, this.x1 - camera.drawOffsetX, this.y1 - camera.drawOffsetY, 4);
    }
}

function createLightningSprite(lifespan: number, x0: number, y0: number, x1: number, y1: number) {
    const res = new LightningSprite(x0, y0, x1, y1);
    res.lifespan = lifespan;
    game.currentScene().physicsEngine.addSprite(res);
    return res;
}