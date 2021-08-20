
function registerRendererControls(renderer: ScriptRenderer, startBattle: () => void) {
    let battleStarted = false;

    registerHandler(controller.A, () => {
        battleStarted = renderer.aButtonDown();
        if (battleStarted) {
            startBattle();
        }
    });
    registerHandler(controller.up, () => {
        renderer.upButtonDown();
    });
    registerHandler(controller.down, () => {
        renderer.downButtonDown();
    });
    registerHandler(controller.left, () => {
        renderer.leftButtonDown();
    });
    registerHandler(controller.right, () => {
        renderer.rightButtonDown();
    });

    function registerHandler(
        btn: controller.Button,
        handler: () => void,
        evt = ControllerButtonEvent.Pressed
    ) {
        btn.onEvent(evt, () => {
            if (!battleStarted) {
                handler();
            }
        })
    }
}