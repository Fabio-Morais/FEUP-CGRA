/**
 * MyVehicleFormat
 * @constructor
 */
class MyVehicleFormat extends CGFobject {
    constructor(scene) {
        super(scene);
        this.airship = new MySphere(scene, 20, 30);
        this.gondola = new MySphere(scene, 20, 30);
        this.gondolaBody = new MyCylinder(scene, 20, 1,0.5);
        this.lemesEsquerda = new MyLeme(scene);
        this.lemesDireita = new MyLeme(scene);
        this.lemesCima = new MyLeme(scene);
        this.lemesBaixo = new MyLeme(scene);
        this.motorHelice = new MyMotorHelice(scene);

        this.airship.initBuffers();
        this.gondola.initBuffers();
        this.gondolaBody.initBuffers();

        this.body = new CGFappearance(this.scene);
        this.body.setAmbient(1, 1, 1, 1);
        this.body.setDiffuse(1, 1, 1, 1);
        this.body.setSpecular(0, 0, 0, 1);
        this.body.setShininess(10.0);
        this.body.loadTexture('images/bodyAirship.jpg');
        this.body.setTextureWrap('REPEAT', 'REPEAT');

        this.components = new CGFappearance(this.scene);
        this.components.setAmbient(1, 1, 1, 1);
        this.components.setDiffuse(1, 1, 1, 1);
        this.components.setSpecular(0, 0, 0, 1);
        this.components.setShininess(10.0);
        this.components.loadTexture('images/componentAirship.jpg');
        this.components.setTextureWrap('REPEAT', 'REPEAT');


        this.components2 = new CGFappearance(this.scene);
        this.components2.setAmbient(1, 1, 1, 1);
        this.components2.setDiffuse(1, 1, 1, 1);
        this.components2.setSpecular(0, 0, 0, 1);
        this.components2.setShininess(10.0);
        this.components2.loadTexture('images/component2Airship.jpg');
        this.components2.setTextureWrap('REPEAT', 'REPEAT');

        this.default = new CGFappearance(this.scene);
        this.default.setAmbient(1, 1, 1, 1);
        this.default.setDiffuse(1, 1, 1, 1);
        this.default.setSpecular(0, 0, 0, 1);
        this.default.setShininess(10.0);

    }

    gondolaDisp() {
        this.components2.apply()
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1);
        this.scene.scale(0.4, 0.6, 0.30);
        this.gondolaBody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.35, 1);
        this.scene.scale(0.2, 0.3, 0.15);
        this.gondola.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1);
        this.scene.scale(0.2, 0.3, 0.15);
        this.gondola.display();
        this.scene.popMatrix();
    }

    helices(speed) {
        this.default.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.motorHelice.display(speed);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.motorHelice.display(speed);
        this.scene.popMatrix();

    }

    lemes(rotate) {
        this.components.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.9, -1.7, 0);
        this.lemesEsquerda.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, -1.7, 0);
        this.lemesDireita.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, -0.85);
        this.scene.rotate(rotate, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.lemesCima.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, 0.9);
        this.scene.rotate(rotate, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.lemesBaixo.display();
        this.scene.popMatrix();
    }

    display(rotate, speedRotate) {

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.body.apply();
        this.airship.display();
        this.scene.popMatrix();
        this.gondolaDisp();
        this.lemes(rotate);
        this.helices(speedRotate);

    }


}
