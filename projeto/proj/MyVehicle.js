/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.vehic = new MyVehicleFormat(this.scene);
        this.flag = new MyFlag(this.scene);
        this.supply = [new MySupply(this.scene), new MySupply(this.scene), new MySupply(this.scene), new MySupply(this.scene), new MySupply(this.scene)];
        this.supplyPointer = 0;
        this.nSuppliesDelivered = 0.0;
        this.automaticPilot = false;
        this.center = [0.0, 0.0];

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.speed = 0;
        this.angle = 0;
        this.rotate = 0;
        this.t = 0;
        this.texture2 = new CGFtexture(this.scene, "images/waterMap.jpg");

        this.testShaders = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.testShaders.setUniformsValues({uSampler2: 1});
        this.testShaders.setUniformsValues({timeFactor: 0});
    }

    resetRotate() {
        this.rotate = 0;
    }

    display(rotateHelice, displayVei, scaleFactor) {
        if (displayVei) {
            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);
            this.scene.rotate(this.angle, 0, 1, 0);
            this.scene.translate(0, 10, 0);
            this.scene.scale(scaleFactor, scaleFactor, scaleFactor);

            this.scene.pushMatrix();
            this.scene.rotate(this.inclina, 1, 0, 0);
            this.scene.rotate(this.inclinaLados, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.vehic.display(this.rotate, this.speed * 1.2 * (rotateHelice * 5));
            this.scene.popMatrix();


            this.scene.setActiveShader(this.testShaders);
            this.texture2.bind(1);

            this.scene.pushMatrix();
            this.scene.translate(0, 0, -3.5);
            this.scene.scale(1.5, 1.5, 1.5)
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.flag.display(this.testShaders, this.speed);
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);
            this.scene.popMatrix();
        }

        for (this.i = 0; this.i < this.nSuppliesDelivered; this.i++) {
            this.scene.pushMatrix();
            console.log("[" + this.i + "] - " + this.supply[this.i].state)
            this.supply[this.i].display();
            this.scene.popMatrix();


        }
    }

    update(t, speedFactor, elapsedTime) {
        this.testShaders.setUniformsValues({timeFactor: ((t) / (100 - 5 * (this.speed * speedFactor)) % 8)});
        if (this.supply[this.supplyPointer].state === this.supply[this.supplyPointer].SupplyStates.FALLING) {
            this.supply[this.supplyPointer].update((elapsedTime / 50)); // /50 porque o update tem ciclo de 50ms
        }

        if (this.supplyPointer < 4 && this.supply[this.supplyPointer].state === this.supply[this.supplyPointer].SupplyStates.LANDED) {
            this.supplyPointer++;
        }
        if (this.automaticPilot) {
            this.speed = 7;
            console.log(this.center[0]+" ->"+this.center[1]);
            this.x = Math.cos(-this.aux) * 5 + this.center[0];
            this.z = Math.sin(-this.aux) * 5 + this.center[1];

            this.angle = Math.PI / 2 + this.aux - Math.PI / 2;
            this.aux -= 0.0628 * (elapsedTime / 50);//2Pi * 50ms /5s = 0.062832
        }else{
            this.z += this.speed * Math.cos(this.angle);
            this.x += this.speed * Math.sin(this.angle);
        }
    }

    turn(val) {
        if (val > 0) {
            this.angle += 0.5 * (this.speed + 0.05);
            this.rotate = Math.PI / 14;
            this.inclinaLados = -Math.PI / 80;
        } else {
            this.angle -= 0.5 * (this.speed + 0.05);
            this.rotate = -Math.PI / 14;
            this.inclinaLados = Math.PI / 80;
        }
    }

    accelerate(val) {
        this.speed = val / 10;
    }

    updateValues(key, speed) {
        if (!this.automaticPilot) {
            this.inclina = 0;
            this.inclinaLados = 0;
            this.accelerate(speed);
            for (var i = 0; i < key.length; i++) {
                this.rotate = 0;
                if (key.charAt(i) === 'W') {
                    this.inclina = Math.PI / 200;
                }
                if (key.charAt(i) === 'S') {
                    if (this.speed > 0)
                        this.inclina = -Math.PI / 200;
                }
                if (key.charAt(i) === 'A') {
                    this.turn(1);

                }
                if (key.charAt(i) === 'D') {
                    this.turn(-1);


                }

                console.log("angle: " + this.angle)
            }

            if (Math.abs(this.x) > 24.5 || Math.abs(this.z) > 24.5) {
                this.angle = this.angle - Math.PI / 2;
            }
        }
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angle = 0;
        this.automaticPilot = false;
        this.speed = 0;
        for (this.i = 0; this.i < 5; this.i++) {
            this.supply[this.i].state = 0;
        }
        this.nSuppliesDelivered = 0;
        this.supplyPointer = 0;
    }

    toAutomaticPilot() {
        if (!this.automaticPilot) {
            this.oposto = Math.sin(this.angle + Math.PI / 2) * 5;
            this.adj = Math.cos(this.angle + Math.PI / 2) * 5;

            this.center = [this.x - this.oposto, this.z - this.adj];
            if (this.z > this.center[1])
                this.start = -Math.acos((this.x - this.center[0]) / 5);
            else
                this.start = Math.acos((this.x - this.center[0]) / 5);

            this.aux = this.start;
            //console.log('angle '+ this.aux);
           this.automaticPilot = true;

        }
    }

    enableNormalViz() {
        this.vehic.enableNormalViz();

    }

    disableNormalViz() {
        this.vehic.disableNormalViz();

    }

}

