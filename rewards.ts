const availableRewards = [
    Modifier.BouncyArrows,
    Modifier.SpinAttack,
    // Modifier.DeflectOnWalls,
    Modifier.FastMove,
    Modifier.FastTurn,
    Modifier.ExtendedMelee,
    // Modifier.MeleeProjectile
]


class Artifact extends Item {
    constructor(public modifier: Modifier) {
        super();
    }
}

function makeArtifact(modifier: Modifier, icon: Image, name: string, description: string) {
    const result = new Artifact(modifier);
    result.icon = icon;
    result.name = name;
    result.description = description;
    return result;
}

function getArtifact(modifier: Modifier) {
    switch (modifier) {
        case Modifier.BouncyArrows:
            return makeArtifact(
                modifier,
                assets.image`bouncyArrows`,
                "Rubber Arrows",
                "Arrows bounce off walls up to three times"
            );
        case Modifier.ExtendedMelee:
            return makeArtifact(
                modifier,
                assets.image`biggerSword`,
                "Bigger Sword",
                "Increases the range of your sword attack"
            )
        case Modifier.FastMove:
            return makeArtifact(
                modifier,
                assets.image`wingedSandals`,
                "Winged Sandals",
                "Makes all move actions execute faster"
            )
        case Modifier.FastTurn:
            return makeArtifact(
                modifier,
                assets.image`compass`,
                "Compass",
                "Rotate faster when turning"
            )
        case Modifier.SpinAttack:
            return makeArtifact(
                modifier,
                assets.image`spinAttack`,
                "Spin Attack",
                "Turns your sword attack into a spin attack"
            )
    }

    return undefined;
}


class RewardScreen implements Screen {
    renderable: scene.Renderable;
    currIndex: number;

    constructor(public rewards: Item[]) {
        this.renderable = scene.createRenderable(90, (target: Image, camera: scene.Camera) => {
            this.draw(target, camera);
        })
        this.currIndex = 1;
        this.setInfoText(this.rewards[this.currIndex].name, this.rewards[this.currIndex].description)
    }

    public get width() {
        let width = 0;

        for (let reward of this.rewards) {
            width += reward.icon.width + 10;
        }

        return width - 10;
    }
    public set width(v: number) { }

    draw(target: Image, camera: scene.Camera) {
        target.fill(0xc);

        target.printCenter("Choose a Reward", 10, 1);

        const top = 30;
        let left = 80 - (this.width >> 1);
        for (let i = 0; i < this.rewards.length; i++) {
            const action = this.rewards[i];
            if (this.currIndex === i) {
                target.drawRect(left - 1, top - 1, 13, 13, 4);
            }
            target.drawTransparentImage(action.icon, left, top);
            left += action.icon.width + 10;
        }

        this.drawInfoBox(target);
    }

    aButtonDown() {
        story.clearAllText();
        return true;
    }

    upButtonDown() {
    }

    downButtonDown() {
    }

    leftButtonDown() {
        this.currIndex = (this.currIndex + this.rewards.length - 1) % this.rewards.length;
        this.setInfoText(this.rewards[this.currIndex].name, this.rewards[this.currIndex].description)
    }

    rightButtonDown() {
        this.currIndex = (this.currIndex + 1) % this.rewards.length;
        this.setInfoText(this.rewards[this.currIndex].name, this.rewards[this.currIndex].description)
    }

    destroy() {
        this.renderable.destroy();
    }

    drawInfoBox(target: Image) {
        const top = 60;
        const left = 30;
        target.fillRect(left, top, 100, 40, 0xc)
        target.fillRect(left + 1, top + 1, 98, 38, 0xd)
        target.fillRect(left + 3, top + 11, 94, 1, 0xb)
    }

    setInfoText(title: string, description: string) {
        const top = 60;
        const left = 30;

        story.clearAllText();
        story.setPagePauseLength(9999999, 9999999);
        control.runInParallel(() => {
            story.printDialog(title, left + 8, top + 35, 90, 16, 0xc, 0, story.TextSpeed.VeryFast);
        })
        control.runInParallel(() => {
            story.printDialog(description, left + 50, top + 55, 90, 100, 0xc, 0, story.TextSpeed.VeryFast);
        })
    }
}