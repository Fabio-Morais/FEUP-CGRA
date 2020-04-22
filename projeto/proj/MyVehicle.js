/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.vehic = new MyVehicleFormat(this.scene);
        this.flag = new MyFlag(this.scene);

        this.x=0;
        this.y=0;
        this.z=0;
        this.speed=0;
        this.angle=0;
        this.rotate=0;
        this.t=0;
        this.texture2 = new CGFtexture(this.scene, "images/waterMap.jpg");

        this.testShaders = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.testShaders.setUniformsValues({ uSampler2: 1 });
        this.testShaders.setUniformsValues({ timeFactor: 0 });
    }
    enableNormalViz() {

    }

    disableNormalViz() {

    }
    resetRotate(){
        this.rotate=0;
    }
    display(rotateHelice) {

        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y, this.z);
        this.scene.rotate(this.angle, 0,1,0);
        this.scene.translate(0,10,0);

        this.scene.pushMatrix();
            this.scene.rotate(this.inclina, 1,0,0);
            this.scene.rotate(this.inclinaLados, 0,0,1);
            this.scene.rotate(Math.PI/2, 1,0,0);
            this.vehic.display(this.rotate, this.speed*(rotateHelice*10));
            this.scene.popMatrix();

            this.scene.setActiveShader(this.testShaders);
            this.texture2.bind(1);

            this.scene.pushMatrix();
            this.scene.translate(0,0,-3.5);
            this.scene.scale(1.5,1.5,1.5)
            this.scene.rotate(Math.PI/2,0,1,0);
            this.flag.display(this.testShaders, this.speed);
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

    }

    update(key, speed) {
        this.speed=speed/10;
        this.z += this.speed*Math.cos(this.angle);
        this.x += this.speed*Math.sin(this.angle);
        this.inclina=0;
        this.inclinaLados=0;
        for (var i=0; i<key.length; i++){
            this.rotate=0;
            if (key.charAt(i) == 'W') {
                this.inclina = Math.PI / 200;
            }
            if (key.charAt(i) == 'S') {
                if(this.speed>0)
                    this.inclina = -Math.PI / 200;
            }
        if (key.charAt(i) == 'A') {
            this.angle += 0.5*(this.speed+0.05);
            this.rotate=Math.PI/14;
            this.inclinaLados=-Math.PI / 80;
        }
        if (key.charAt(i) == 'D') {
            this.angle -= 0.5*(this.speed+0.05);
            this.rotate=-Math.PI/14;
            this.inclinaLados=Math.PI / 80;

        }

        if(key.charAt(i) == 'R'){
            this.x=0;
            this.y=0;
            this.z=0;
            this.angle=0;

        }
    }
    }
    enableNormalViz(){
        this.vehic.enableNormalViz();

    }
    disableNormalViz(){
        this.vehic.disableNormalViz();

    }

}

