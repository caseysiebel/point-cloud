const THREE = require('three')

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

let renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

camera.position.z = 50

geometry = new THREE.Geometry();
material = new THREE.PointsMaterial( { size:.1 } );


function render() {
    requestAnimationFrame( render )
    renderer.render( scene, camera )

    object3d.rotation.x += 0.013
    object3d.rotation.y += 0.01
    object3d.rotation.z += 0.017
}


fetch('/data')
    .then(resp => resp.json())
    .then(data => {
        data = JSON.parse(data)
        for(let i = 0; i < data.x.length; i++){
            let x = data.x[i],
                y = data.y[i],
                z = data.z[i]
            geometry.vertices.push(new THREE.Vector3(x,y,z));
        }
        object3d = new THREE.Points(geometry, material);
        scene.add(object3d);
        render()
    })
    .catch(err => console.error(err))
