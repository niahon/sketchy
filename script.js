"use strict"

const elCanvas = document.querySelector("canvas");
const flex = document.querySelector(".flex");
elCanvas.width = window.innerWidth * 0.8;
elCanvas.height = window.innerHeight * 0.8;

if (elCanvas.getContext) {
    const ctx = elCanvas.getContext("2d");
    const canvasLimit = elCanvas.getBoundingClientRect();

    
    elCanvas.addEventListener("pointerdown", startLine);
    elCanvas.addEventListener("pointerup", () => {
        elCanvas.removeEventListener("pointermove", updateLine);
    });     
    
    function startLine(e) {
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY - canvasLimit.y);
        elCanvas.addEventListener("pointermove", updateLine);
        /* 
        ctx.quadraticCurveTo(e.clientX, e.clientY, 20, 20) */
    }

    function updateLine(e) {
        ctx.lineTo(e.pageX, e.pageY - canvasLimit.y);
        ctx.closePath;
        ctx.stroke();
    }

}

else {
    console.log("Canvas not supported");
}