/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quadSides = new MyQuad(this.scene);
        this.quadTop = new MyQuad(this.scene);
        this.quadBottom = new MyQuad(this.scene);
        this.x=0;
        this.y=0;
        this.z=0;
        this.speed=0.2;
        this.angle=0;

    }
    enableNormalViz() {

    }

    disableNormalViz() {

    }
    display() {

        this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0,1,0);
        this.scene.translate(this.x,this.y, this.z);


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quadSides.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadTop.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quadBottom.display();
        this.scene.popMatrix();


        this.scene.popMatrix();

    }

    update(key, speed) {
        this.speed=speed*0.2;
        for (var i=0; i<key.length; i++){
        if (key.charAt(i) == 'W') {
            this.z -= this.speed;
        }
        if (key.charAt(i) == 'A') {
            this.angle += 0.2*this.speed;
        }
        if (key.charAt(i) == 'D') {
            this.angle -= 0.2*this.speed;
        }
        if (key.charAt(i) == 'S') {
            this.z += this.speed;
        }
    }
    }

}

