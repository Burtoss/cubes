var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0,10,100);

var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#999999");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
})

var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial( { color: Math.random()* 0xffffff  } );
var cube = new THREE.Mesh(geometry, material);

var inputScale = document.getElementById("scale");
var valueScale = inputScale.value/10;
cube.scale.x = valueScale;
cube.scale.y = valueScale;
cube.scale.z = valueScale;
cube.position.y = valueScale / 2;

inputScale.addEventListener("input", function(e){
	var valueScale = inputScale.value/10;
	cube.scale.x = valueScale;
	cube.scale.y = valueScale;
	cube.scale.z = valueScale;
	cube.position.y = valueScale/2;
	this.nextElementSibling.textContent = "Размер="+e.target.value;
	for (var i = cube.children.length - 1; i >= 0; i--) {
		cube.children[i].material.color = new THREE.Color(Math.random()* 0xffffff);
	}
	cube.material.color = new THREE.Color(Math.random()* 0xffffff);
}, false);


var inputQuantity = document.getElementById("quantity");
var valueQuantity = inputQuantity.value;

inputQuantity.addEventListener("input", function(e){
	cube.material.visible = false; 
	for (var i = cube.children.length - 1; i >= 0; i--) {
		if(cube.children[i].type === "Mesh")
				cube.remove(cube.children[i]);
	}

	for( var i = 0; i <= inputQuantity.value; i ++ ) {
		for (var j = inputQuantity.value - i; j >= 1; j -- ) {
			object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random()* 0xffffff  } ));
			object.position.x= -(object.geometry.parameters.width + valueScale/10)*(+inputQuantity.value+1 -i)/2 + (object.geometry.parameters.width + valueScale/10)*(j);
			object.position.y = object.geometry.parameters.width*i;

			camera.position.y = 10 + object.geometry.parameters.width*i;
			camera.position.z = 100 + object.geometry.parameters.width*i;
			cube.add( object );
		}
	}
	this.nextElementSibling.textContent = "Количество снизу="+e.target.value;
}, false);



scene.add(cube);

var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

var gridHelper = new THREE.GridHelper( 100, 10, 0xffffff, 0xbbbbbb );
scene.add( gridHelper );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

var render = function (){
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
}

render();


