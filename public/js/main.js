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

    object3d.rotation.x += 0.007
    object3d.rotation.y += 0.005
    object3d.rotation.z += 0.009
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

let isMouseDown = false

document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('mousedown', (e) => isMouseDown = true)
document.addEventListener('mouseup', (e) => isMouseDown = false)

function onDocumentMouseMove( event ) {

    event.preventDefault();

    if ( isMouseDown ) {

        theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
                + onMouseDownTheta;
        phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
              + onMouseDownPhi;

        phi = Math.min( 180, Math.max( 0, phi ) );

        camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
        camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.updateMatrix();

    }

    let projector = new THREE.Projector()

    mouse3D = projector.unprojectVector(
        new THREE.Vector3(
            ( event.clientX / renderer.domElement.width ) * 2 - 1,
            - ( event.clientY / renderer.domElement.height ) * 2 + 1,
            0.5
        ),
        camera
    );
    ray.direction = mouse3D.subSelf( camera.position ).normalize();

    interact();
    render();

}
