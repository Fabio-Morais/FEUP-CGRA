/**
 * MyMotorHelice
 * @constructor
 */
class MyMotorHelice extends CGFobject {
    constructor(scene) {
        super(scene);
        this.asa = new MySphere(scene,40,50);
        this.asa.initBuffers();
        this.aux=2;
    }
    helice(speedRotate){
        this.scene.pushMatrix();
        this.scene.rotate(speedRotate,0,0,1);

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.6,0.01);
        this.asa.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.1,0.6,0.01);
        this.asa.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.scale(0.1,0.1,0.1);
        this.asa.display();
        this.scene.popMatrix();


    }
    display(speedRotate){
        this.helice(speedRotate);
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.3,0.9);
        this.scene.translate(0,0,1);
        this.asa.display();
        this.scene.popMatrix();



    }


}
