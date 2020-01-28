class AnimationEditor {

    public keys: AnimationEditorKey[] = []

    constructor() {
        this.keys.push(new AnimationEditorKey("torso.position", AnimationEditorKeyType.Vector3, this));
        this.keys.push(new AnimationEditorKey("torso.rotation", AnimationEditorKeyType.Quaternion, this));
        this.keys.push(new AnimationEditorKey("leftEyeOpen", AnimationEditorKeyType.Number, this));
        this.keys.push(new AnimationEditorKey("rightEyeOpen", AnimationEditorKeyType.Number, this));
    }

    public initialize(): void {
        for (let i = 0; i < this.keys.length; i++) {
            this.keys[i].initialize();
        }
    }
}