/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
    SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2
    };

    constructor(scene) {
        super(scene);
        this.state=this.SupplyStates.INACTIVE;
        this.boxClose = new MyUnitCubeQuad(scene);
        this.boxOpen = new MyUnitCubeQuadOpen(scene);
        this.x=0;
        this.y=0;
        this.z=0;
        this.initMaterials();


    }
    initMaterials(){

        this.close = new CGFappearance(this.scene);
        this.close.setAmbient(1, 1, 1, 1);
        this.close.setShininess(120.0);
        this.close.loadTexture('images/box.jpg');
        this.close.setTextureWrap('REPEAT', 'REPEAT');


        this.open = new CGFappearance(this.scene);
        this.open.setAmbient(1, 1, 1, 1);
        this.open.setDiffuse(1, 1, 1, 1);
        this.open.setSpecular(0, 0, 0, 1);
        this.open.setShininess(120.0);
        this.open.loadTexture('images/box2.jpg');
        this.open.setTextureWrap('REPEAT', 'REPEAT');
    }

    //update position of box when is falling
    update(){

    }
    drop(dropPosition){
        this.x=dropPosition[0]
        this.y=10-1.5;
        this.z=dropPosition[1];
        this.state = this.SupplyStates.FALLING
    }
    land(){
        if(this.y<=0 && this.SupplyStates.FALLING){
            this.state= this.SupplyStates.LANDED;
        }else
            this.y-=0.1416666667; // 50ms * 7.5 /32 = 0.125

    }

    display() {
        console.log(this.x+"-"+this.y+"-"+this.z+ " ---> "+ this.state)
        if(this.state == this.SupplyStates.FALLING){
            this.close.apply()
            this.scene.pushMatrix();
            this.scene.translate(this.x,this.y, this.z);
            this.boxClose.display();
            this.scene.popMatrix();
        } else if(this.state == this.SupplyStates.LANDED){

            this.open.apply()
            this.scene.pushMatrix();
            this.scene.translate(this.x,this.y, this.z);
            this.boxOpen.display();
            this.scene.popMatrix();

        }
    }

    enableNormalViz(){

    }
    disableNormalViz(){

    }

}

