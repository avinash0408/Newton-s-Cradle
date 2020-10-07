
function start(){
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Composites=Matter.Composites,
    Composite=Matter.Composite,
    Body=Matter.Body,
    Mouse = Matter.Mouse,
    Constraint=Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Bodies = Matter.Bodies;
   

// create an engine
var engine = Engine.create();
// create a renderer
var render = Render.create({
   // element: document.body,
   canvas: document.getElementById('canv'),
    engine: engine,
   // canvas:document.getElementById('mycanvas'),
    options:{
        width:screen.availWidth,
        height:screen.height,
        wireframes:false,
        background: 'rgb(255,0,0,0.5)',
        showVelocity:true
    }
  
});
var my_style={
    fillStyle: 'white',
    strokeStyle: 'white',
    lineWidth: 3};
    var wu=Bodies.rectangle(750,1,1580,1,{isStatic:true,render:my_style});
var wl=Bodies.rectangle(0,300,1,1000,{isStatic:true,render:my_style});
var wr=Bodies.rectangle(1536,300,1,1000,{isStatic:true,render:my_style});
//console.log(window.innerHeight);
var cradle=newCradle(350,0,7,20,250);
Body.translate(cradle.bodies[0], { x: -100, y: -100 });
var ground=Bodies.rectangle(750,745,1580,1,{isStatic:true,render:my_style});
var dock_left=Bodies.rectangle(950,300,2,200,{isStatic:true,render:my_style});
//var dock_right=Bodies.rectangle(1300,340,2,200,{isStatic:true,render:my_style});
var docker=Bodies.rectangle(1240,400,600,2,{isStatic:true,render:my_style
});




// add all of the bodies to the world
World.add(engine.world, [wu,wr,wl,cradle,ground,docker,dock_left]);
var circle_arr=[60,55,50,45,40,35,30,25,20,15,10];
for(var i=0;i<circle_arr.length;i++){
    var circle=Bodies.circle(1200+10*i,200,circle_arr[i],
        { inertia: Infinity, restitution: 0.6, friction: 0, frictionAir: 0.0001, slop: 1 });
    World.add(engine.world,[circle]);
    //console.log(circle);
}
// Matter.Events.on(engine, 'collisionStart', function(event) {
//     let a = event.pairs.bodyA;
//     let b = event.pairs.bodyB;
//     console.log(a);
//     console.log(b);

//     // check bodies, do whatever...
// });
document.addEventListener("dragover", function(e){
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;

    console.log("X: "+dragX+" Y: "+dragY);
}, false);
//mouse constraints
var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
World.add(engine.world,mouseConstraint);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
var x=document.querySelector('button');
x.style.display="none";

 function newCradle(xx, yy, number, size, length) {
  var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

  for (var i = 0; i < number; i++) {
      var separation = 1.9,
          circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                      { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }),
          constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

      Composite.addBody(newtonsCradle, circle);
      Composite.addConstraint(newtonsCradle, constraint);
      size=size;
  }
//   var final_thread= Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy },bodyB:circle});
//   Composite.addConstraint(newtonsCradle, final_thread);

  return newtonsCradle;
};

}
