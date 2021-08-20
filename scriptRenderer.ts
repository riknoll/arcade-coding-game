class ScriptRenderer {
    width: number;
    protected renderable: scene.Renderable;

    constructor(protected character: Character) {
        this.renderable = scene.createRenderable(11, (target, camera) => {
            this.draw(target, camera);
        })

        this.width = 0;

        for (let action of this.character.script) {
            this.width += action.icon.width + 1;
        }
    }

    draw(target: Image, camera: scene.Camera) {
        const top = 105;
        let left = 80 - (this.width >> 1);

        for (const action of this.character.script) {
            if (action === this.character.currentAction) {
                target.setPixel(left + 5, top + 12, 2);
                target.fillRect(left + 4, top + 13, 3, 1, 2);
            }
            target.drawImage(action.icon, left, top);
            left += action.icon.width + 1;
        }
    }

    destroy() {
        this.renderable.destroy();
    }
}