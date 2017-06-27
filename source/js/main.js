(function() {
    var openFormButton = document.querySelector('.arrow-down');
    var form = document.querySelector('.form');
    var nav = document.querySelector('.nav');

    if (openFormButton) {
        openFormButton.addEventListener('click', function(e) {
            e.preventDefault();
            ITVDN.form.open();
        })
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (ITVDN.form.isValid()) {
                console.log('All good');
            } else {
                console.log('Is not valid');
            }

        })
    }

    if (nav) {
        nav.addEventListener('click', function(e) {
            var target = e.target;

            if (target.tagName.toLowerCase() !== 'a') {
                return;
            }

            e.preventDefault();
            ITVDN.navigation.toggleToActiveLink(target);
        });
    };

}());


/*video play*/
(function(){
    var time = document.getElementById('time'); 
    var btn = document.getElementById('btn'); 
var frameNumber = 0, // start video at frame 0
                     // lower numbers = faster playback

    playbackConst = 500,  // get page height from video duration
    setHeight = document.getElementById("set-height"), 
    // select video element         
    video = document.getElementById('video'); 
    // var video = $('#v0')[0]; // jquery option

// dynamically set the page height according to video length
video.addEventListener('loadedmetadata', function() {
  document.body.scrollTop = 0; 

  setHeight.style.height = Math.floor(video.duration) * playbackConst + "px";
});

video.addEventListener('ended', () => {
    video.style.display = 'none';
    setHeight.style.height = 0;
});

btn.addEventListener('click', () => {
    document.body.scrollTop  = 10 * playbackConst;
});


// Use requestAnimationFrame for smooth playback
function scrollPlay(){  
  var frameNumber  = window.pageYOffset/playbackConst;
  video.currentTime  = frameNumber;
  time.textContent = 'время видео ' + frameNumber + ' сек';

  window.requestAnimationFrame(scrollPlay);

}

window.requestAnimationFrame(scrollPlay);   

})();