/**
 * MyLeme
 * @constructor
 */
class MyLeme extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(scene);
        this.quad = new MyQuad(scene);
        this.quad.initBuffers();
        this.triangle.initBuffers();
    }
    display(){
        this.scene.pushMatrix()
        this.scene.scale(0.8,0.8,1);


        this.scene.pushMatrix();
        this.scene.scale(0.5,1,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,0.7,1);
        this.scene.translate(0,-0.5,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,0.7,1);
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


    }


}
