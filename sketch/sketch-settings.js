export const settingsFunc = (settings, canvas) => {
    if (canvas) {
        settings.canvas = canvas;
    }
    return settings;
};
const settings = {
    name: "synth",
    animate: true,
    context: "webgl",
    duration: 28,
};
export default settings;
