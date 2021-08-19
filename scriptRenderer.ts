class ScriptRenderer {
    width: number;
    protected renderable: scene.Renderable;
    protected active: Block;

    constructor(protected script: Block[]) {
        this.renderable = scene.createRenderable(11, (target, camera) => {
            this.draw(target, camera);
        })

        this.width = 0;

        for (let action of script) {
            this.width += action.icon.width + 1;
        }
    }

    draw(target: Image, camera: scene.Camera) {
        const top = 105;
        let left = 80 - (this.width >> 1);

        for (const action of this.script) {
            if (action === this.active) {
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

    execute(character: Character) {
        for (const action of this.script) {
            this.active = action;
            executeAction(character, action);
        }
    }
}