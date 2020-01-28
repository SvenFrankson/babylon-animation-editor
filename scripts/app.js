class AnimationEditor {
    constructor() {
        this.keys = [];
        this.keys.push(new AnimationEditorKey("torso.position", AnimationEditorKeyType.Vector3, this));
        this.keys.push(new AnimationEditorKey("torso.rotation", AnimationEditorKeyType.Quaternion, this));
        this.keys.push(new AnimationEditorKey("leftEyeOpen", AnimationEditorKeyType.Number, this));
        this.keys.push(new AnimationEditorKey("rightEyeOpen", AnimationEditorKeyType.Number, this));
    }
    initialize() {
        for (let i = 0; i < this.keys.length; i++) {
            this.keys[i].initialize();
        }
    }
}
var AnimationEditorKeyType;
(function (AnimationEditorKeyType) {
    AnimationEditorKeyType[AnimationEditorKeyType["Number"] = 0] = "Number";
    AnimationEditorKeyType[AnimationEditorKeyType["Vector3"] = 1] = "Vector3";
    AnimationEditorKeyType[AnimationEditorKeyType["Quaternion"] = 2] = "Quaternion";
})(AnimationEditorKeyType || (AnimationEditorKeyType = {}));
class AnimationEditorKey {
    constructor(name, type, editor) {
        this.name = name;
        this.type = type;
        this.editor = editor;
    }
    initialize() {
        this.createUI();
    }
    createUI() {
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
    _createLine() {
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
    createUINumber() {
        let line = this._createLine();
        let valueContainer = line.querySelector(".key-value-container");
        let input = document.createElement("input");
        input.classList.add("number-input");
        input.setAttribute("type", "number");
        valueContainer.appendChild(input);
        return line;
    }
    createUIVector3() {
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
    createUIQuaternion() {
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
/// <reference path="../../lib/babylon.d.ts"/>
/// <reference path="../../lib/babylon.gui.d.ts"/>
var COS30 = Math.cos(Math.PI / 6);
class Main {
    static get cellShadingMaterial() {
        if (!Main._cellShadingMaterial) {
            Main._cellShadingMaterial = new ToonMaterial("CellMaterial", BABYLON.Color3.White(), Main.Scene);
        }
        return Main._cellShadingMaterial;
    }
    static get terrainCellShadingMaterial() {
        if (!Main._terrainCellShadingMaterial) {
            Main._terrainCellShadingMaterial = new TerrainToonMaterial("CellMaterial", BABYLON.Color3.White(), Main.Scene);
        }
        return Main._terrainCellShadingMaterial;
    }
    constructor(canvasElement) {
        Main.Canvas = document.getElementById(canvasElement);
        Main.Engine = new BABYLON.Engine(Main.Canvas, true, { preserveDrawingBuffer: true, stencil: true });
    }
    initializeCamera() {
        Main.Camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), Main.Scene);
        Main.Camera.setPosition(new BABYLON.Vector3(3, 3, 5));
    }
    async initialize() {
        await this.initializeScene();
    }
    async initializeScene() {
        Main.Scene = new BABYLON.Scene(Main.Engine);
        this.initializeCamera();
        Main.Camera.minZ = 0.2;
        Main.Camera.maxZ = 100;
        Main.Light = new BABYLON.HemisphericLight("AmbientLight", new BABYLON.Vector3(1, 3, 2), Main.Scene);
        BABYLON.Effect.ShadersStore["EdgeFragmentShader"] = `
			#ifdef GL_ES
			precision highp float;
			#endif
			varying vec2 vUV;
			uniform sampler2D textureSampler;
			uniform sampler2D depthSampler;
			uniform float 		width;
			uniform float 		height;
			void make_kernel_color(inout vec4 n[9], sampler2D tex, vec2 coord)
			{
				float w = 1.0 / width;
				float h = 1.0 / height;
				n[0] = texture2D(tex, coord + vec2( -w, -h));
				n[1] = texture2D(tex, coord + vec2(0.0, -h));
				n[2] = texture2D(tex, coord + vec2(  w, -h));
				n[3] = texture2D(tex, coord + vec2( -w, 0.0));
				n[4] = texture2D(tex, coord);
				n[5] = texture2D(tex, coord + vec2(  w, 0.0));
				n[6] = texture2D(tex, coord + vec2( -w, h));
				n[7] = texture2D(tex, coord + vec2(0.0, h));
				n[8] = texture2D(tex, coord + vec2(  w, h));
			}
			void make_kernel_depth(inout float n[9], sampler2D tex, vec2 coord)
			{
				float w = 1.0 / width;
				float h = 1.0 / height;
				n[0] = texture2D(tex, coord + vec2( -w, -h)).r;
				n[1] = texture2D(tex, coord + vec2(0.0, -h)).r;
				n[2] = texture2D(tex, coord + vec2(  w, -h)).r;
				n[3] = texture2D(tex, coord + vec2( -w, 0.0)).r;
				n[4] = texture2D(tex, coord).r;
				n[5] = texture2D(tex, coord + vec2(  w, 0.0)).r;
				n[6] = texture2D(tex, coord + vec2( -w, h)).r;
				n[7] = texture2D(tex, coord + vec2(0.0, h)).r;
				n[8] = texture2D(tex, coord + vec2(  w, h)).r;
			}
			void main(void) 
			{
				vec4 d = texture2D(depthSampler, vUV);
				float depth = d.r * (2000.0 - 0.2) + 0.2;
				
				float nD[9];
				make_kernel_depth( nD, depthSampler, vUV );
				float sobel_depth_edge_h = nD[2] + (2.0*nD[5]) + nD[8] - (nD[0] + (2.0*nD[3]) + nD[6]);
				float sobel_depth_edge_v = nD[0] + (2.0*nD[1]) + nD[2] - (nD[6] + (2.0*nD[7]) + nD[8]);
				float sobel_depth = sqrt((sobel_depth_edge_h * sobel_depth_edge_h) + (sobel_depth_edge_v * sobel_depth_edge_v));
				float thresholdDepth = 0.002;

				vec4 n[9];
				make_kernel_color( n, textureSampler, vUV );
				vec4 sobel_edge_h = n[2] + (2.0*n[5]) + n[8] - (n[0] + (2.0*n[3]) + n[6]);
				vec4 sobel_edge_v = n[0] + (2.0*n[1]) + n[2] - (n[6] + (2.0*n[7]) + n[8]);
				vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));
				float threshold = 0.4 + max((depth - 20.) / 30., 0.);
				
				gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
				if (sobel_depth < thresholdDepth || depth > 1000.) {
					if (max(sobel.r, max(sobel.g, sobel.b)) < threshold) {
						gl_FragColor = n[4];
					}
				} 
			}
        `;
        BABYLON.Engine.ShadersRepository = "./shaders/";
        /*
        let depthMap = Main.Scene.enableDepthRenderer(Main.Camera).getDepthMap();
        
        let postProcess = new BABYLON.PostProcess("Edge", "Edge", ["width", "height"], ["depthSampler"], 1, Main.Camera);
        postProcess.onApply = (effect) => {
            effect.setTexture("depthSampler", depthMap);
            effect.setFloat("width", Main.Engine.getRenderWidth());
            effect.setFloat("height", Main.Engine.getRenderHeight());
        };
        */
        let noPostProcessCamera = new BABYLON.FreeCamera("no-post-process-camera", BABYLON.Vector3.Zero(), Main.Scene);
        noPostProcessCamera.parent = Main.Camera;
        noPostProcessCamera.layerMask = 0x10000000;
        Main.Scene.activeCameras.push(Main.Camera, noPostProcessCamera);
        let animationEditor = new AnimationEditor();
        animationEditor.initialize();
        console.log("Main scene Initialized.");
    }
    animate() {
        Main.Engine.runRenderLoop(() => {
            Main.Scene.render();
        });
        window.addEventListener("resize", () => {
            Main.Engine.resize();
        });
    }
}
window.addEventListener("load", async () => {
    let main = new Main("render-canvas");
    await main.initialize();
    main.animate();
});
class SeaMaterial extends BABYLON.ShaderMaterial {
    constructor(name, scene) {
        super(name, scene, {
            vertex: "sea",
            fragment: "sea",
        }, {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true
        });
        this.t = 0;
        this.dir0 = BABYLON.Vector2.Zero();
        this.dir1 = BABYLON.Vector2.Zero();
        this.dir2 = BABYLON.Vector2.Zero();
        this.dir3 = BABYLON.Vector2.Zero();
        this.dir4 = BABYLON.Vector2.Zero();
        this.dir5 = BABYLON.Vector2.Zero();
        this.dir6 = BABYLON.Vector2.Zero();
        this._updateTime = () => {
            this.setFloat("time", this.t++ / 60);
        };
        this.dir0 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.dir1 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.dir2 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.dir3 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.dir4 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.dir5 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.dir6 = new BABYLON.Vector2(Math.random(), Math.random()).normalize();
        this.setVector2("dir0", this.dir0);
        this.setVector2("dir1", this.dir1);
        this.setVector2("dir2", this.dir2);
        this.setVector2("dir3", this.dir3);
        this.setVector2("dir4", this.dir4);
        this.setVector2("dir5", this.dir5);
        this.setVector2("dir6", this.dir6);
        this.setFloat("a0", 1 / 7);
        this.setFloat("a1", 1 / 7);
        this.setFloat("a2", 1 / 7);
        this.setFloat("a3", 1 / 7);
        this.setFloat("a4", 1 / 7);
        this.setFloat("a5", 1 / 7);
        this.setFloat("a6", 1 / 7);
        scene.registerBeforeRender(this._updateTime);
    }
}
class TerrainToonMaterial extends BABYLON.ShaderMaterial {
    constructor(name, color, scene) {
        super(name, scene, {
            vertex: "terrainToon",
            fragment: "terrainToon",
        }, {
            attributes: ["position", "normal", "uv", "color"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });
        this.setVector3("lightInvDirW", (new BABYLON.Vector3(0.5 + Math.random(), 2.5 + Math.random(), 1.5 + Math.random())).normalize());
        this.setColor3("colGrass", BABYLON.Color3.FromHexString("#47a632"));
        this.setColor3("colDirt", BABYLON.Color3.FromHexString("#a86f32"));
        this.setColor3("colRock", BABYLON.Color3.FromHexString("#8c8c89"));
        this.setColor3("colSand", BABYLON.Color3.FromHexString("#dbc67b"));
    }
}
class ToonMaterial extends BABYLON.ShaderMaterial {
    constructor(name, color, scene) {
        super(name, scene, {
            vertex: "toon",
            fragment: "toon",
        }, {
            attributes: ["position", "normal", "uv", "color"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });
        this.setVector3("lightInvDirW", (new BABYLON.Vector3(0.5 + Math.random(), 2.5 + Math.random(), 1.5 + Math.random())).normalize());
    }
}
