interface Screen {
    aButtonDown(): boolean;
    upButtonDown(): void;
    downButtonDown(): void;
    leftButtonDown(): void;
    rightButtonDown(): void;
    destroy(): void;
}


function registerRendererControls(renderer: Screen, startBattle: () => void) {
    let battleStarted = false;

    registerHandler(controller.A, () => {
        battleStarted = renderer.aButtonDown();
        if (battleStarted) {
            startBattle();
        }
    });
    registerHandler(controller.up, () => {
        if (battleStarted) {
            scriptTimeModifier -= 0.1;

            if (scriptTimeModifier < 0.1) scriptTimeModifier = 0.1
        }
        else renderer.upButtonDown();
    });
    registerHandler(controller.down, () => {
        if (battleStarted) {
            scriptTimeModifier += 0.1;
        }
        else renderer.downButtonDown();
    });
    registerHandler(controller.left, () => {
        if (!battleStarted) renderer.leftButtonDown();
    });
    registerHandler(controller.right, () => {
        if (!battleStarted) renderer.rightButtonDown();
    });

    function registerHandler(
        btn: controller.Button,
        handler: () => void,
        evt = ControllerButtonEvent.Pressed
    ) {
        btn.onEvent(evt, () => {
            handler();
        })
    }
}