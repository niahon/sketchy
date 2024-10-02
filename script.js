const elCanvas = document.querySelector("canvas");
const ctx = elCanvas.getContext("2d");

elCanvas.width = window.innerWidth
elCanvas.height = window.innerHeight;

window.addEventListener("pointerdown", () => {
    elCanvas.addEventListener("pointermove", linePath);
})
window.addEventListener("pointerup", () => {
    elCanvas.removeEventListener("pointermove", linePath);
})

function linePath(e) {
    console.log(e.clientX);
    console.log(e.clientY);
}