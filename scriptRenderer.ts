class ScriptRenderer {
    protected renderable: scene.Renderable;
    protected static startImg = img`
        7 7 7 7 7 7 7 7 7 7 7
        7 6 6 6 6 6 6 6 6 6 7
        7 6 7 7 6 6 6 6 6 6 7
        7 6 7 7 7 7 6 6 6 6 7
        7 6 7 7 7 7 7 7 6 6 7
        7 6 7 7 7 7 7 7 7 6 7
        7 6 7 7 7 7 7 7 6 6 7
        7 6 7 7 7 7 6 6 6 6 7
        7 6 7 7 6 6 6 6 6 6 7
        7 6 6 6 6 6 6 6 6 6 7
        7 7 7 7 7 7 7 7 7 7 7
    `;
    protected static selectArrow = img`
        5 5 5 5 5
        5 5 5 5 5
        . 5 5 5 .
        . . 5 . .
        . . . . .
    `;
    protected static selectedOutline = img`
        5 5 5 5 5 5 5 5 5 5 5 5 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 . . . . . . . . . . . 5
        5 5 5 5 5 5 5 5 5 5 5 5 5
    `;
    protected currIndex: number;
    protected showSelection: boolean;

    constructor(protected character: Character) {
        this.renderable = scene.createRenderable(11, (target, camera) => {
            this.draw(target, camera);
        });

        this.currIndex = this.character.script.length();
        this.showSelection = true;
    }

    public get width() {
        let width = 0;

        for (let action of this.character.script.current) {
            width += action.icon.width + 1;
        }

        return width;
    }
    public set width(v: number) {}

    draw(target: Image, camera: scene.Camera) {
        const top = 105;
        let left = 80 - (this.width >> 1);

        for (let i = 0; i < this.character.script.current.length; i++) {
            const action = this.character.script.current[i];
            if (action === this.character.currentAction) {
                target.setPixel(left + 5, top + 12, 2);
                target.fillRect(left + 4, top + 13, 3, 1, 2);
            }
            if (this.currIndex === this.character.script.currentStartIndex() + i) {
                this.drawSelection(target, left - 1, top - 1);
            }
            target.drawImage(action.icon, left, top);
            left += action.icon.width + 1;
        }
        const startLeft = 151 - ScriptRenderer.startImg.width;
        if (this.currIndex === this.character.script.length()) {
            this.drawSelection(target, startLeft - 1, top - 1);
        }
        target.drawImage(ScriptRenderer.startImg, startLeft, top);
    }

    destroy() {
        this.renderable.destroy();
    }

    drawSelection(target: Image, left: number, top: number) {
        if (this.showSelection) {
            target.drawImage(ScriptRenderer.selectedOutline, left, top);
        }
    }

    upButtonDown() { 
        this.currIndex = 0;
    }
    downButtonDown() {
        this.currIndex = this.character.script.currentStartIndex();
    }
    leftButtonDown() {
        this.currIndex = Math.max(this.currIndex - 1, 0);
    }
    rightButtonDown() {
        this.currIndex = Math.min(this.currIndex + 1, this.character.script.length());
    }

    aButtonDown(): boolean {
        if (this.currIndex === this.character.script.length()) {
            this.showSelection = false;
            return true;
        } else {
            return false;
        }
    }

    aButtonRelease() { 

    }
}