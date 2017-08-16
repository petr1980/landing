'use strict';

(function () {
  var app = new PIXI.Application(1100, 600, { 
    backgroundColor: 0x000000 
  });

  var btn = document.getElementById('runWebglBtn');
  var pageWebgl = document.getElementById('webgl');
      pageWebgl.appendChild(app.view);

      btn.addEventListener('click', function(){
        var t1 = new TimelineMax();
            t1.to(displacementFilter.scale, 1.5, {y: 1100, x:1100})
              .to(displacementFilter.scale, 1.5, {y: 0,  x:0}, 1.5);

            t1.fromTo(img2, 1.5, {alpha: 0, rotation:0.01, transformOrigin:"50% 50%"},{alpha: 1, rotation:0, transformOrigin:"50% 50%"}, 1);
      });

  var container = new PIXI.Container();
      app.stage.addChild(container);

  // reder image
  var img1 = new PIXI.Sprite.fromImage('../images/back.jpg');
      img1.width = app.renderer.width *1.2;
      img1.height = app.renderer.height*1.2;
      img1.position.x = -20;
      img1.position.y = -20;
      container.addChild(img1);


  var img2 = new PIXI.Sprite.fromImage('../images/back2.jpg');
      img2.width = app.renderer.width *1.2;
      img2.height = app.renderer.height*1.2;
      img2.position.x = -20;
      img2.position.y = -20;
      img2.alpha = 0;
      container.addChild(img2);

      


  // add filters
  var disSprite = PIXI.Sprite.fromImage('../images/filter2.jpg');
      disSprite.width = app.renderer.width;
      disSprite.height = app.renderer.height;

  var displacementFilter = new PIXI.filters.DisplacementFilter(disSprite);
      displacementFilter.scale.set(0);

  app.stage.addChild(disSprite);
  container.filters = [displacementFilter];
 
  

 // anim
 var i = 50;
 var back = true;

  //draw();
  function draw(){
   // disSprite.x += 1;
   // disSprite.y += 1;
  
   i += back ? 1 : -1;
   if (i>100||i<50) { back = !back };

    displacementFilter.scale.set(i);

    app.render(container);

    window.requestAnimationFrame(draw);
  };

  // app.ticker.add(function () {

  //   i += back ? 1 : -1;
  //   if (i > 100 || i < 50) { back = !back };

  //   displacementFilter.scale.set(i);
  // });

   



})();