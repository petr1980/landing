

//anim title
function splitTextTag(tag) {
  var title = document.querySelector(tag);
  var text = title.textContent;
  title.innerHTML = '';
  for (var i = 0; i < text.length; i++) {
    var el = document.createElement('span');
    el.textContent = text[i];
    title.appendChild(el);
  };
};

splitTextTag('.hero__about');


// [].forEach.call(title, function(el){
//   el.outerHTML = Splitter(el.outerHTML, '<span class="split">$</span>')
// });

// anim header
function headerAnim(){
var t2 = new TimelineMax();

t2.to('.loader__inner', 1.5, { scale: 1, onComplete: function () {
    document.getElementById('loader').style.display = 'none'
  }})
  .fromTo('.header_right', .6, {x:-200, opacity:0}, {x:0, opacity:1})
  .staggerFromTo('.nav a', 1, {y:20, opacity:0}, {y:0, opacity:1}, 0.15)
  .staggerFromTo('.hero__about span', .5, {y:-60, opacity:0}, {ease: Back.easeOut.config(1.7), y:0, opacity:1}, 0.05)
  .fromTo('.hero__title', .6, {y:40, opacity:0}, {y:0, opacity:1}, '+=.5')
  .fromTo('.button--yellow', .6, {y:40, opacity:0}, {y:0, opacity:1});
};
headerAnim();

document.querySelector('.header__button').addEventListener('click', function(e){
  e.preventDefault();

  headerAnim();
});



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
      .to(el, 0.5, { strokeWidth: stWidth, stroke: "green" })
      .to(el, 0.5, { strokeDashoffset: lenStar });

    tl.restart();
  }


  aminSvgBtn2.onclick = function () {
    animGsock('star', 10);
  }
  aminSvgBtn.onclick = function () {
    animGsock('elephant', 2);
  }



})();



