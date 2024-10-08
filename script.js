"use strict"
const elCanvas = document.querySelector("canvas");
if (elCanvas.getContext) {
    // Canvas variables
    const ctx = elCanvas.getContext("2d");
    const canvasLimit = elCanvas.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    elCanvas.width = windowWidth * 0.85;
    elCanvas.height = windowHeight * 0.85;

    // Tool variables
    const toolBar = document.getElementsByClassName("tool")
    const toolList = []
    const colorPicker = document.getElementById("color");
    const brushSize = document.getElementById("brush-size");
    const clearBtn = document.getElementById("clear");
    let currentColor = colorPicker.value; 
    let currentSize = 12;

    // Tool event listeners
    for (let item of toolBar) {
        toolList.push(item);    
    }

    for (let button of toolList) {
        button.addEventListener("click", toggleButton);
    }

    clearBtn.addEventListener("click", () => {
        ctx.reset();
    });
  
    colorPicker.addEventListener("change", (e) => {
        currentColor = e.target.value;
    })
    brushSize.addEventListener("input", (e) => {
        currentSize = e.target.value;
    })

    function toggleButton(e) {
        let clickedBtn = e.currentTarget;
        for (let btn of toolList) {
            if (toolList.indexOf(btn) != toolList.indexOf(clickedBtn) && (toolListeners.checkToggle(btn))) {
                btn.classList.remove("toggled");
            }
        }
        clickedBtn.classList.add("toggled");
        let tool = `${e.currentTarget.id}Listeners`;
        toolListeners[tool]();
    }

    const toolListeners = {
        pencilListeners: function() {
            elCanvas.addEventListener("pointerdown", brushActions.startLine);
            elCanvas.addEventListener("pointerup", () => {
                elCanvas.removeEventListener("pointermove", brushActions.updateLine);
            });     
        },
        shapeListeners: function() {
            elCanvas.addEventListener("pointerdown", createCircle);
            elCanvas.addEventListener("pointerup", () => {
                elCanvas.removeEventListener("pointermove", updateCircle);
            });
        },

        checkToggle: function(tool) {
            if (tool.classList.contains("toggled")) {
                return true;
            }
        }
    }

    // Tool actions
    function calcX(x) {
        return ((x - windowWidth * 0.05) - ((windowWidth * 0.9 - elCanvas.width) / 2 ))
    }
    function calcY(y) {
        return y - canvasLimit.y
    }

    const brushActions = {
        startLine: function(e) {
            if (toolListeners.checkToggle(toolList[0])) {
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = currentSize;
                ctx.beginPath();
                let x = calcX(e.pageX);
                let y = calcY(e.pageY);
                ctx.moveTo(x, y);
                elCanvas.addEventListener("pointermove", brushActions.updateLine);
            }
        },
        updateLine: function(e) {
            let x = calcX(e.pageX);
            let y = calcY(e.pageY);
            ctx.lineTo(x, y);
            ctx.stroke();
        },
    }

    let circle;
    function createCircle(e) {
        circle = new Circle(true, calcX(e.pageX), calcY(e.pageY));
        circle.setPosition();
        elCanvas.addEventListener("pointermove", updateCircle)
    }

     function updateCircle(e) {
        circle.updatePosition(calcX(e.pageX), calcY(e.pageY));
        circle.deletePosition(calcX(e.pageX), calcY(e.pageY));
    }

    class Circle {
        constructor(isPointerActive, x, y) {
            this.isPointerActive = isPointerActive
            this.initialX = x;
            this.initialY = y;
            this.prevX = 0;
            this.prevY = 0;
            this.radius = 10;
            this.counter = 0;
        }

        setPosition() {
        }

        deletePosition(currentX, currentY) {
        }
        updatePosition(currentX, currentY) {
        }

    }

}

else {
    console.log("Canvas not supported");
}