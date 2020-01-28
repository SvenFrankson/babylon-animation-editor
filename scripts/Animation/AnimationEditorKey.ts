enum AnimationEditorKeyType {
    Number,
    Vector3,
    Quaternion
}

class AnimationEditorKey {

    constructor(
        public name: string,
        public type: AnimationEditorKeyType,
        public editor: AnimationEditor
    ) {
        
    }

    public initialize(): void {
        this.createUI();
    }

    public createUI(): HTMLDivElement {
        if (this.type === AnimationEditorKeyType.Number) {
            return this.createUINumber();
        }
        if (this.type === AnimationEditorKeyType.Vector3) {
            return this.createUIVector3();
        }
        if (this.type === AnimationEditorKeyType.Quaternion) {
            return this.createUIQuaternion();
        }
    }

    private _createLine(): HTMLDivElement {
        let line = document.createElement("div");
        line.classList.add("key-line");
        document.getElementById("animation-keys").appendChild(line);

        let label = document.createElement("span");
        label.classList.add("key-name");
        label.textContent = this.name;
        line.appendChild(label);

        let valueContainer = document.createElement("div");
        valueContainer.classList.add("key-value-container");
        line.appendChild(valueContainer);

        let buttonK = document.createElement("button");
        buttonK.classList.add("key-button");
        buttonK.textContent = "K";
        line.appendChild(buttonK);
        
        let buttonT = document.createElement("button");
        buttonT.classList.add("key-button");
        buttonT.textContent = "T";
        line.appendChild(buttonT);
        
        let buttonX = document.createElement("button");
        buttonX.classList.add("key-button");
        buttonX.textContent = "X";
        line.appendChild(buttonX);

        return line;
    }

    public createUINumber(): HTMLDivElement {
        let line = this._createLine();

        let valueContainer = line.querySelector(".key-value-container");

        let input = document.createElement("input");
        input.classList.add("number-input");
        input.setAttribute("type", "number");
        valueContainer.appendChild(input);

        return line;
    }

    public createUIVector3(): HTMLDivElement {
        let line = this._createLine();

        let valueContainer = line.querySelector(".key-value-container");

        let labelX = document.createElement("span");
        labelX.classList.add("label");
        labelX.textContent = "x";
        valueContainer.appendChild(labelX);

        let inputX = document.createElement("input");
        inputX.classList.add("v3-input");
        inputX.setAttribute("type", "number");
        valueContainer.appendChild(inputX);
        
        let labelY = document.createElement("span");
        labelY.classList.add("label");
        labelY.textContent = "y";
        valueContainer.appendChild(labelY);

        let inputY = document.createElement("input");
        inputY.classList.add("v3-input");
        inputY.setAttribute("type", "number");
        valueContainer.appendChild(inputY);
        
        let labelZ = document.createElement("span");
        labelZ.classList.add("label");
        labelZ.textContent = "z";
        valueContainer.appendChild(labelZ);

        let inputZ = document.createElement("input");
        inputZ.classList.add("v3-input");
        inputZ.setAttribute("type", "number");
        valueContainer.appendChild(inputZ);

        return line;
    }

    public createUIQuaternion(): HTMLDivElement {
        let line = this._createLine();

        let valueContainer = line.querySelector(".key-value-container");

        let labelX = document.createElement("span");
        labelX.classList.add("label");
        labelX.textContent = "x";
        valueContainer.appendChild(labelX);

        let inputX = document.createElement("input");
        inputX.classList.add("q-input");
        inputX.setAttribute("type", "number");
        valueContainer.appendChild(inputX);
        
        let labelY = document.createElement("span");
        labelY.classList.add("label");
        labelY.textContent = "y";
        valueContainer.appendChild(labelY);

        let inputY = document.createElement("input");
        inputY.classList.add("q-input");
        inputY.setAttribute("type", "number");
        valueContainer.appendChild(inputY);
        
        let labelZ = document.createElement("span");
        labelZ.classList.add("label");
        labelZ.textContent = "z";
        valueContainer.appendChild(labelZ);

        let inputZ = document.createElement("input");
        inputZ.classList.add("q-input");
        inputZ.setAttribute("type", "number");
        valueContainer.appendChild(inputZ);
        
        let labelW = document.createElement("span");
        labelW.classList.add("label");
        labelW.textContent = "w";
        valueContainer.appendChild(labelW);

        let inputW = document.createElement("input");
        inputW.classList.add("q-input");
        inputW.setAttribute("type", "number");
        valueContainer.appendChild(inputW);

        return line;
    }
}