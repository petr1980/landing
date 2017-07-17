(function () {
    var openFormButton = document.querySelector('.arrow-down');
    var form = document.querySelector('.form');
    var nav = document.querySelector('.nav');

    if (openFormButton) {
        openFormButton.addEventListener('click', function (e) {
            e.preventDefault();
            ITVDN.form.open();
        })
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (ITVDN.form.isValid()) {
                console.log('All good');
            } else {
                console.log('Is not valid');
            }

        })
    }

    if (nav) {
        nav.addEventListener('click', function (e) {
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
(function () {
    window.onload = function () {
        var videosection = document.getElementById('videosection');
        var time = document.getElementById('time');
        var btn = document.getElementById('btn');
        var removeBtn = document.getElementById('removeBtn');
        var frameNumber = 0; // start video at frame 0  lower numbers = faster playback
        var playbackConst = 500;  // get page height from video duration
        var setHeight = document.getElementById("set-height");
        // select video element         
        var video = document.getElementById('video');
        var seeVideoBtn = document.getElementById('seeVideo');


        seeVideoBtn.addEventListener('click', () => {
            videosection.style.display = 'block';
            window.requestAnimationFrame(scrollPlay);
        });

        // dynamically set the page height according to video length
        video.addEventListener('loadedmetadata', setScrollvideo);

        function setScrollvideo() {
            //    document.body.scrollTop = 0;
            setHeight.style.height = Math.floor(video.duration) * playbackConst + "px";
            console.log(video.readyState);
        };


        video.addEventListener('ended', () => {
            videosection.style.display = 'none';
        });

        removeBtn.addEventListener('click', () => {
            videosection.style.display = 'none';
        });

        btn.addEventListener('click', () => {
            document.body.scrollTop = 10 * playbackConst;
            console.log(document.body.scrollTop);
        });


        // Use requestAnimationFrame for smooth playback
        function scrollPlay() {
            var frameNumber = window.pageYOffset / playbackConst;
            video.currentTime = frameNumber;
            time.textContent = 'время видео ' + frameNumber + ' сек';
            window.requestAnimationFrame(scrollPlay)
        }
    }
})();

(function () {
    var bgCover = document.querySelectorAll('.bgCover');
    var logo = document.querySelector('logo');
    for (var i = 0; i < bgCover.length; i++) {
        var parent = bgCover[i];

        parent.addEventListener('click', function() {
            this.classList.toggle('anim');
            this.classList.toggle('reverse');
        });
    }

})();