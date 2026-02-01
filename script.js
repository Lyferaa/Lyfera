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

    // --- NAVIGASI PINTAR UNTUK HP ---
    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('.page-cover') || e.target.closest('.page-content')) {
            const touchX = e.touches[0].clientX;
            const screenWidth = window.innerWidth;

            // Jika sentuh layar bagian kiri (30% layar), balik ke halaman sebelumnya
            if (touchX < screenWidth * 0.3) {
                pageFlip.flipPrev();
            } 
            // Jika sentuh sisa layarnya, lanjut ke halaman depan
            else {
                pageFlip.flipNext();
            }
        }
    });
});
