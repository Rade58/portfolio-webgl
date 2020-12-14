import { createMachine, interpret } from "xstate";
// ---- FINITE STATES  n'   EVENTS ----
export var fse;
(function (fse) {
    fse["idle"] = "idle";
    fse["blah"] = "blah";
})(fse || (fse = {}));
export var EE;
(function (EE) {
    EE["TOGGLE"] = "TOGGLE";
    EE["PLACEHOLDER"] = "PLACEHOLDER";
})(EE || (EE = {}));
// -----------------------------------
// -------------------------------------------------------
// ------------------- MACHINE ---------------------------
// -------------------------------------------------------
const sceneMachine = createMachine({
    id: "sketch_state_machine",
    initial: fse.idle,
    context: {
        tick: 0,
    },
    states: {
        [fse.idle]: {
            on: {
                [EE.TOGGLE]: {
                    target: fse.blah,
                },
            },
        },
        [fse.blah]: {
            on: {
                [EE.TOGGLE]: {
                    target: fse.idle,
                },
            },
        },
    },
});
// -----------------------------------------------------
// -----------------------------------------------------
export const sceneService = interpret(sceneMachine);
sceneService.onTransition((state, event) => {
    console.log("SKETCH STATE MACHINE");
    console.log(`TRANSITIONING TO - ${state.value} - FINITE STATE`);
    console.log(`COSEQUENCE OF - ${event.type} - EVENT`);
    console.log("-------------------------------------");
});
sceneService.start();
