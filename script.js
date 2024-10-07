"use strict"

const elCanvas = document.querySelector("canvas");
const flex = document.querySelector(".flex");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
elCanvas.width = windowWidth * 0.8;
elCanvas.height = windowHeight * 0.8;

const elPencil = document.getElementById("pencil");
const toolbar = [elPencil]



if (elCanvas.getContext) {
    const ctx = elCanvas.getContext("2d");

    for (let button of toolbar) {
        button.addEventListener("click", toggleButton);
    }

    function toggleButton(e) {
        for (let button of toolbar) {
            if (toolbar.indexOf(button) != toolbar.indexOf(e.currentTarget) && (button.classList.contains("toggled"))) {
                button.classList.remove("toggled");
            }
        }
        e.target.classList.add("toggled");
        let test = `${e.currentTarget.id}Listeners`;
        console.log(test);
        toolListeners[test]();
    }

    const toolListeners = {
        pencilListeners: function() {
            elCanvas.addEventListener("pointerdown", startLine);
            elCanvas.addEventListener("pointerup", () => {
            elCanvas.removeEventListener("pointermove", updateLine);
        });     
        },
        colorListeners: function() {

        },
    }

    function startLine(e) {
        ctx.beginPath();
        let x = calcX(e.pageX);
        let y = calcY(e.pageY);
        ctx.moveTo(x, y);
        elCanvas.addEventListener("pointermove", updateLine);
        /* 
        ctx.quadraticCurveTo(e.clientX, e.clientY, 20, 20) */
    }

    function updateLine(e) {
        console.log(e.pageX);
        console.log(e.pageY);
        let x = calcX(e.pageX);
        let y = calcY(e.pageY);
        ctx.lineTo(x, y);
        ctx.closePath;
        ctx.stroke();
    }

    const canvasLimit = elCanvas.getBoundingClientRect();

    function calcX(x) {
        return ((x - windowWidth * 0.05) - ((windowWidth * 0.9 - elCanvas.width) / 2 ))
    }
    function calcY(y) {
        return y - canvasLimit.y
    }

}

else {
    console.log("Canvas not supported");
}