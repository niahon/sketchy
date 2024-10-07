"use strict"
const elCanvas = document.querySelector("canvas");
const ctx = elCanvas.getContext("2d");
if (elCanvas.getContext) {
    
    const flex = document.querySelector(".flex");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    elCanvas.width = windowWidth * 0.8;
    elCanvas.height = windowHeight * 0.8;

    const toolList = document.getElementsByClassName("tool")
    const toolBar = []
    console.log(toolList);
    for (let item of toolList) {
        toolBar.push(item);    
    }
    console.log(toolBar[0]);

    for (let button of toolBar) {
        button.addEventListener("click", toggleButton);
    }

    function toggleButton(e) {
        for (let button of toolBar) {
            if (toolBar.indexOf(button) != toolBar.indexOf(e.currentTarget) && (button.classList.contains("toggled"))) {
                button.classList.remove("toggled");
                console.log(button.classList);
            }
        }
        e.currentTarget.classList.add("toggled");
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

        checkToggle: function(tool) {
            if (tool.classList.contains("toggled")) {
                return true;
            }
        }
    }

    function startLine(e) {
            if (toolListeners.checkToggle(toolBar[0])) {
                ctx.beginPath();
                let x = calcX(e.pageX);
                let y = calcY(e.pageY);
                ctx.moveTo(x, y);
                elCanvas.addEventListener("pointermove", updateLine);
                /* 
                ctx.quadraticCurveTo(e.clientX, e.clientY, 20, 20) */
            }
            
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