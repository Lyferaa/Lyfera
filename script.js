document.addEventListener('DOMContentLoaded', function() {
    // 1. Inisialisasi PageFlip
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

    // 2. Audio & Musik
    const flipSound = document.getElementById('flipSound');
    const bgMusic = document.getElementById('bgMusic');

    pageFlip.on('flip', (e) => {
        flipSound.currentTime = 0;
        flipSound.play();
        if (bgMusic && bgMusic.paused) {
            bgMusic.volume = 0.3;
            bgMusic.play();
        }
    });

    // 3. Tombol Mode Baca (Untuk HP)
    const readBtn = document.getElementById('read-mode-btn');
    const bookContainer = document.querySelector('.container');

    if(readBtn) {
        readBtn.addEventListener('click', () => {
            bookContainer.classList.toggle('reading');
            if (bookContainer.classList.contains('reading')) {
                readBtn.innerText = "🖼️ Lihat Tampilan Utuh";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                readBtn.innerText = "📖 Perbesar Tulisan";
            }
        });
    }

    // 4. Navigasi Tap
    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('.page-cover') || e.target.closest('.page-content')) {
            const touchX = e.touches[0].clientX;
            const screenWidth = window.innerWidth;

            if (touchX < screenWidth * 0.4) {
                pageFlip.flipPrev();
            } else {
                pageFlip.flipNext();
            }
        }
    }, {passive: true});
});
