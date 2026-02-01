document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIKA AMPLOP VINTAGE (TAMBAHKAN INI) ---
    const sealBtn = document.getElementById('wax-seal-btn');
    const envelope = document.getElementById('envelope-wrapper');
    const instruction = document.getElementById('instruction-text');

    if (sealBtn) {
        sealBtn.addEventListener('click', function() {
            // Animasi memudar
            envelope.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            envelope.style.opacity = "0";
            envelope.style.transform = "scale(1.1)";

            setTimeout(() => {
                envelope.style.display = "none";
                
                // Munculkan instruksi miringkan ponsel
                if (instruction) {
                    instruction.style.display = "block";
                    instruction.style.opacity = "0";
                    setTimeout(() => {
                        instruction.style.transition = "opacity 1s ease";
                        instruction.style.opacity = "1";
                    }, 50);
                }
            }, 800);
        });
    }

    // --- 2. INISIALISASI BUKU (KODE ASLIMU) ---
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
        if (flipSound) {
            flipSound.currentTime = 0;
            flipSound.play();
        }
        if (bgMusic && bgMusic.paused) {
            bgMusic.volume = 0.3;
            bgMusic.play();
        }
    });

    // --- 3. NAVIGASI TAP (KODE ASLIMU) ---
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
