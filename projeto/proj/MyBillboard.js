/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {


    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 20);
        this.rectangle = new MyPlane(this.scene, 30);
        this.base = new MyCylinder(this.scene, 30);
        this.initMaterials();

    }

    initMaterials() {
        this.appearance = new CGFappearance(this.scene);

        this.appearance.loadTexture('images/supplies.png');
        this.appearance.setTextureWrap('WARM', 'WARM');
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1.0, 1.0, 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(120);

        this.appearance2 = new CGFappearance(this.scene);
        this.appearance2.loadTexture('images/box2.jpg');
        this.appearance2.setTextureWrap('WARM', 'WARM');
        this.appearance2.setAmbient(1, 1, 1, 1);
        this.appearance2.setDiffuse(1.0, 1.0, 1.0, 1);
        this.appearance2.setSpecular(1.0, 1.0, 1.0, 1);
        this.appearance2.setShininess(120);

        this.testShaders = new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");


    }

    update(nSuppliesDelivered) {
        this.percOfSupplies = nSuppliesDelivered / 5.0 * 100.0;
    }

    display() {

        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1)
        this.plane.display();
        this.scene.popMatrix();

        this.appearance2.apply();

        //parte de tras branca
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.testShaders);
        this.testShaders.setUniformsValues({percOfSupplies: this.percOfSupplies});

        //retangulo a mudar
        this.scene.pushMatrix();
        this.scene.scale(1.5, 0.2, 1);
        this.scene.translate(0, 0, 0.01);
        this.rectangle.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        //Bases
        this.scene.pushMatrix();
        this.scene.translate(0.9, -1.5, 0);
        this.scene.scale(0.02, 1, 0.02)
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, -1.5, 0);
        this.scene.scale(0.02, 1, 0.02)
        this.base.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.plane.enableNormalViz();
        this.rectangle.enableNormalViz();
    }

    disableNormalViz() {
        this.plane.disableNormalViz();
        this.rectangle.disableNormalViz();
    }

}

