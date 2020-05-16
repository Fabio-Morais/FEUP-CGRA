class Material extends CGFobject {
    constructor(scene) {
        super(scene);

    }

    skyBox(){
        this.skybox_day = new CGFappearance(this.scene);
        this.skybox_day.setAmbient(1, 1, 1, 1);
        this.skybox_day.setDiffuse(0, 0, 0, 1);
        this.skybox_day.setSpecular(0, 0, 0, 1);
        this.skybox_day.setShininess(150.0);
        this.skybox_day.loadTexture('images/cubemap.png');
        this.skybox_day.setTextureWrap('REPEAT', 'REPEAT');
        return this.skybox_day;
    }
    default(){
        this.defaultAp = new CGFappearance(this.scene);
        this.defaultAp.setAmbient(1, 1, 1, 1);
        this.defaultAp.setDiffuse(0, 0, 0, 1);
        this.defaultAp.setSpecular(0, 0, 0, 1);
        this.defaultAp.setShininess(10.0);
        return this.defaultAp;
    }

}