"use strict"
const elCanvas = document.querySelector("canvas");
const ctx = elCanvas.getContext("2d");
if (elCanvas.getContext) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    elCanvas.width = windowWidth * 0.85;
    elCanvas.height = windowHeight * 0.85;

    const toolBar = document.getElementsByClassName("tool")
    const toolList = []
    for (let item of toolBar) {
        toolList.push(item);    
    }
    console.log(toolList[0]);

    for (let button of toolList) {
        button.addEventListener("click", toggleButton);
    }

    const colorPicker = document.getElementById("color");
    let currentColor = colorPicker.value;   
    colorPicker.addEventListener("change", (e) => {
        currentColor = e.target.value;
    })
    const brushSize = document.getElementById("brush-size");
    let currentSize = 12;
    brushSize.addEventListener("input", (e) => {
        currentSize = e.target.value;
    })

    function toggleButton(e) {
        for (let button of toolList) {
            if (toolList.indexOf(button) != toolList.indexOf(e.currentTarget) && (button.classList.contains("toggled"))) {
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
            if (toolListeners.checkToggle(toolList[0])) {
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = currentSize;
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