/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);          
        this.scene = scene;
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram= new MyParallelogram(this.scene);
        this.diamond= new MyDiamond(this.scene);

        this.diamond.initBuffers();
		this.triangle.initBuffers();
		this.parallelogram.initBuffers();

        }
        display(){
            this.scene.pushMatrix();
            this.scene.scale(2,2,1);
            this.triangle.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();
            this.scene.scale(1.5,1,1);
            this.scene.translate(-1,0,0);
            this.scene.rotate(Math.PI,0,0,1);
            this.triangle.display();
            this.scene.popMatrix();
    
            
            this.scene.pushMatrix();
            this.scene.translate(-3.5,0,0);
            this.triangle.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI,1,0,0);
            this.parallelogram.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();
            this.scene.translate(0+1.5,2+0.5,0);
            this.scene.scale(2,2,1);
            this.scene.rotate(Math.PI,1,0,0);
            this.scene.rotate(Math.PI,0,1,0);
            this.triangle.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();
            this.scene.translate(3.5,-1,0);
            this.scene.rotate(Math.PI,1,0,0);
            this.scene.rotate(Math.PI,0,1,0);
            this.triangle.display();
            this.scene.popMatrix();
    
            this.scene.pushMatrix();
            this.scene.translate(1.5,3.5,0);
            this.diamond.display();
            this.scene.popMatrix();
        }
	
}
