/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.vehic = new MyVehicleFormat(this.scene);
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
        this.scene.translate(this.x,this.y, this.z);
        this.scene.rotate(this.angle, 0,1,0);

        this.vehic.display();

        this.scene.popMatrix();

    }

    update(key, speed) {
        this.speed=speed*0.2;
        for (var i=0; i<key.length; i++){
        if (key.charAt(i) == 'W') {
            this.z += this.speed*Math.cos(this.angle);
            this.x += this.speed*Math.sin(this.angle);
        }
        if (key.charAt(i) == 'A') {
            this.angle += 0.5*this.speed;
        }
        if (key.charAt(i) == 'D') {
            this.angle -= 0.5*this.speed;
        }
        if (key.charAt(i) == 'S') {
            this.z -= this.speed*Math.cos(this.angle);
            this.x -= this.speed*Math.sin(this.angle);
        }
        if(key.charAt(i) == 'R'){
            this.x=0;
            this.y=0;
            this.z=0;
            this.angle=0;

        }
        console.log(this.angle)
    }
    }
    enableNormalViz(){
        this.vehic.enableNormalViz();

    }
    disableNormalViz(){
        this.vehic.disableNormalViz();

    }

}

