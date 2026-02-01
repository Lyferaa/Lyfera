document.addEventListener('DOMContentLoaded', function() {
    const pageFlip = new St.PageFlip(document.getElementById('demoBookCol'), {
        width: 450, 
        height: 600,
        size: "fixed", // Agar ukuran buku konsisten di tengah
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
        // Musik mulai setelah interaksi pertama
        if (bgMusic.paused) {
            bgMusic.volume = 0.3;
            bgMusic.play();
        }
    });
// --- KODE BARU: AGAR BISA DI-KLIK DI HP ---
    document.addEventListener('touchstart', function(e) {
        // Jika yang disentuh adalah area buku
        if (e.target.closest('.page-cover') || e.target.closest('.page-content')) {
            pageFlip.flipNext(); // Langsung buka halaman selanjutnya
        }
    });
    // --- AKHIR KODE BARU ---

}); // <-- Ini adalah baris paling akhir filemu
