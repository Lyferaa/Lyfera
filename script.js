document.addEventListener('DOMContentLoaded', function() {
    const pageFlip = new St.PageFlip(document.getElementById('demoBookCol'), {
        width: 450, 
        height: 600,
        size: "fixed", 
        minWidth: 450,
        minHeight: 600,
        maxWidth: 450,
        maxHeight: 600,
        maxShadowOpacity: 0.8,
        showCover: true,
        mobileScrollSupport: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    const flipSound = document.getElementById('flipSound');
    const bgMusic = document.getElementById('bgMusic');

    pageFlip.on('flip', (e) => {
        flipSound.currentTime = 0;
        flipSound.play();
        if (bgMusic.paused) {
            bgMusic.volume = 0.3;
            bgMusic.play();
        }
    });

   // Navigasi Tap: Kiri untuk balik, Kanan untuk lanjut
    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('.page-cover') || e.target.closest('.page-content')) {
            const touchX = e.touches[0].clientX;
            const screenWidth = window.innerWidth;

            if (touchX < screenWidth * 0.3) {
                pageFlip.flipPrev(); // Balik ke halaman awal
            } else {
                pageFlip.flipNext(); // Lanjut ke halaman depan
            }
        }
    }, {passive: true});
});


