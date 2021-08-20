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
        const script = this.character.script;
        const top = 105;
        let left = 80 - (this.width >> 1);

        for (let i = 0; i < script.current.length; i++) {
            const action = script.current[i];
            if (action === this.character.currentAction) {
                target.setPixel(left + 5, top + 12, 2);
                target.fillRect(left + 4, top + 13, 3, 1, 2);
            }
            if (this.currIndex === script.currentStartIndex() + i) {
                if (script.held) {
                    this.drawSelection(target, left, top);
                } else {
                    this.drawSelection(target, left - 1, top - 1);
                }
            }
            target.drawImage(action.icon, left, top);
            left += action.icon.width + 1;
        }
        const startLeft = 151 - ScriptRenderer.startImg.width;
        if (this.currIndex === script.length()) {
            if (script.held) {
                this.drawSelection(target, left, top);
            } else {
                this.drawSelection(target, startLeft - 1, top - 1);
            }
        }
        target.drawImage(ScriptRenderer.startImg, startLeft, top);
    }

    destroy() {
        this.renderable.destroy();
    }

    drawSelection(target: Image, left: number, top: number) {
        if (!this.showSelection) return;
        if (this.character.script.held) {
            const heldIcon = this.character.script.held.icon;
            top -= ScriptRenderer.selectArrow.height;
            target.drawTransparentImage(
                ScriptRenderer.selectArrow,
                left - (ScriptRenderer.selectArrow.width / 2),
                top
            );

            target.drawImage(
                heldIcon,
                left - (heldIcon.width / 2),
                top - heldIcon.height - 1
            );

        } else {
            target.drawImage(ScriptRenderer.selectedOutline, left, top);
        }
    }

    upButtonDown() { 
        this.currIndex = 0;
    }
    downButtonDown() {
        this.currIndex = this.maxIndex();
    }
    leftButtonDown() {
        this.currIndex = Math.max(this.currIndex - 1, 0);
    }
    rightButtonDown() {
        this.currIndex = Math.min(this.currIndex + 1, this.maxIndex());
    }

    protected maxIndex(): number {
        return this.character.script.length();
        // if (this.character.script.held) {
        //     return this.character.script.length() - 1;
        // } else {
        //     return this.character.script.length()
        // }
    }

    aButtonDown(): boolean {
        if (this.currIndex === this.character.script.length()) {
            this.showSelection = false;
            return true;
        } else {
            this.character.script.grab(this.currIndex);
            return false;
        }
    }

    aButtonRelease() { 
        this.character.script.release(this.currIndex);
    }
}