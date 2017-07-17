
(function () {
  var aminSvgBtn = document.getElementById('aminSvgBtn');
  var path = document.getElementById('elephant');
  var len = Math.round(path.getTotalLength());
  var offset = 3;

  path.style.strokeDasharray = len;
  aminSvgBtn.addEventListener('click', play);

  function play() {
    path.style.strokeDashoffset = len;
    len = len - offset;
    if (len > 0) {
      requestAnimationFrame(play);
    } else {
      len = Math.round(path.getTotalLength());
    };
  };


  ///// anim2 by greensock //////
  var aminSvgBtn2 = document.getElementById('aminSvgBtn2');

  function animGsock(el, stWidth) {
    var stWidth = stWidth || 6;
    var el = document.getElementById(el);
    var lenStar = Math.round(el.getTotalLength());
    el.style.strokeDasharray = lenStar;
    //var tl = new TimelineMax();  // без повтора
    var tl = new TimelineMax({ repeat: 1, yoyo: true, repeatDelay: 0.5, paused: true });

    tl.to(el, 1, { rotation: "+=360", transformOrigin: "center center", scale: .9 })
      .to(el, 0.5, { strokeWidth:stWidth, stroke: "#000" })
      .to(el, 0.5, { strokeDashoffset: lenStar });

    tl.restart();
  }


  aminSvgBtn2.onclick = function () {
    animGsock('star', 10);
  }
  aminSvgBtn.onclick = function () {
    animGsock('elephant', 3);
  }



})();



