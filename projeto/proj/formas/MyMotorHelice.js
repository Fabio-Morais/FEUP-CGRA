/**
 * MyMotorHelice
 * @constructor
 */
class MyMotorHelice extends CGFobject {
    constructor(scene) {
        super(scene);
        this.asa = new MySphere(scene, 40, 50);
        this.asa.initBuffers();
        this.aux = 2;
        this.default = new CGFappearance(this.scene);

        this.components2 = new CGFappearance(this.scene);
        this.components2.setAmbient(1, 1, 1, 1);
        this.components2.setDiffuse(1, 1, 1, 1);
        this.components2.setSpecular(0, 0, 0, 1);
        this.components2.setShininess(10.0);
        this.components2.loadTexture('images/component2Airship.jpg');
        this.components2.setTextureWrap('REPEAT', 'REPEAT');
    }

    helice(speedRotate) {
        this.scene.pushMatrix();
        if (speedRotate > 7.5)
            this.scene.rotate(speedRotate/4, 0, 0, 1);
        else
            this.scene.rotate(speedRotate, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.6, 0.01);
        this.asa.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.1, 0.6, 0.01);
        this.asa.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.asa.display();
        this.scene.popMatrix();


    }

    display(speedRotate) {
        this.default.apply();
        this.helice(speedRotate);
        this.components2.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.3, 0.9);
        this.scene.translate(0, 0, 1);
        this.asa.display();
        this.scene.popMatrix();


    }


}
