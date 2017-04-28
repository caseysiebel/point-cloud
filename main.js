const THREE = require('three')

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

let renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

camera.position.z = 5

geometry = new THREE.Geometry();
material = new THREE.PointsMaterial( { size:.1 } );

for (let i = 0; i < 5; i++) {
    var x1 = Math.random()*2-1;
    var y1 = Math.random()*2-1;
    var z1 = Math.random()*2-1;
    geometry.vertices.push(new THREE.Vector3(x1,y1,z1));
}

object3d = new THREE.Points(geometry, material);
scene.add(object3d);

function render() {
    requestAnimationFrame( render )
    renderer.render( scene, camera )

    //cube.rotation.x += 0.1
    //cube.rotation.y += 0.1
}

render()
