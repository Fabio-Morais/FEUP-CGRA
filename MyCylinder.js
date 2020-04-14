class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();

    }



    initBuffers(){
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var Ang = 2*Math.PI/this.slices;
    var ang = 0;


    for (var i = 0; i < this.slices; i++) //para cada camada
	{
		for (var j = 0; j < this.slices; j++) // para cada "fatia"
		{
            this.indices.push((2*i+2),(2*i+1),(2*i));
            this.indices.push((2*i+1), (2*i+2), (2*i+3));
		}
    }
    for (var i = 0; i <= this.slices;i++)
	{
		for (var j = 0; j < this.slices; j++)
		{
			this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
			this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));

			this.normals.push(Math.sin(j*Ang));
			this.normals.push(Math.sin(j*Ang));
            this.normals.push(0);
            
            ang += Ang;
		}
  }


    
    
    var s = 0;
	var t = 0;
	var sinc = 1/this.slices;
	var tinc = 1/this.stacks;
	for (var i = 0; i <= this.stacks; i++) {
		for (var j = 0; j < this.slices; j++) {
			this.texCoords.push(s, t);
			s += sinc;
		}
		s = 0;
		t += tinc;
    }


     
    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

    }


}