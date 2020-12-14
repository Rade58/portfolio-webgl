// NOOP, MISLI MDA NA KRAJU OVO NIGDE NECU KORISTITI

import { EE, fse, sceneService } from "./state_machines/scene_state_machine";

export default function initTicking() {
  const initialTime = Date.now();

  async function animationTick() {
    const frameTime = Date.now();

    if (initialTime <= frameTime) {
      // sceneService.send({ type: EE.TICK });
    }

    global.requestAnimationFrame(animationTick);
  }

  animationTick();
}
