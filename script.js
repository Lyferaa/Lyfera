/* ============ 1. DATA — edit di sini saja, desktop & HP ikut berubah ============ */
const SITE = {
    title: "The Weaver’s Eternal Dreamscape",
    by: "Lyfera",
    role: "Anime Illustrator",
    quote: "Step softly into this gallery of dreams, where the ink is still wet with inspiration.",
    about: "Lulusan D3 Teknik Informatika Universitas Dian Nuswantoro yang menekuni ilustrasi digital bergaya anime. Saya membuat karakter original (OC) dan fan art bernuansa klasik dan dramatis, dari sketsa hingga final artwork. Saya terbuka pada feedback, mau belajar menyesuaikan style dari referensi, dan nyaman bekerja sendiri maupun dalam tim.",
    // ISI: software yang kamu pakai, misal ["Clip Studio Paint", "Adobe Photoshop"]. Kosong = tidak tampil.
    tools: [],
    outro: "The ink drieth, and the candles flicker low. Though the book be closed, the souls within shall wander the halls of thy memory forevermore.",
    note: "Beberapa karya lama bertanda tangan @zafera_zahra — itu akun lama saya.",
    contacts: [
        { label: "Instagram @lyfera_", href: "https://www.instagram.com/lyfera_/" },
        { label: "Email", href: "" /* contoh: "mailto:nama@email.com" */ },
        { label: "WhatsApp", href: "" /* contoh: "https://wa.me/628xxxxxxxxxx" */ }
    ]
};

const IG = "https://www.instagram.com/p/";
// tag: "Original Character" / "Fan Art" · link: postingan Instagram asli (tes tiap link sebelum kirim lamaran!)
const ARTWORKS = [
    { title: "Nari Ratih", tag: "Original Character", img: "jawa.jpg", pos: "center 15%", link: IG + "CKasnTAB6gEUgISOqLsPRq6y9mEmo5LSiSMjZ00/",
      text: "Amidst the amber swirl of falling leaves, she remains a steadfast bloom of the East, a lady of lace and gold under the tropic moon." },
    { title: "Beatrix Rosa", tag: "Original Character", img: "eropa.jpg", fit: "contain", link: IG + "CJ-Uq1BhwPcgVXn9s0EfZyFdbnAceFrjAWM9nE0/",
      text: "Beneath the ostrich plumes and the crimson blooms, she hideth a heart of gold, a vision of European splendor amidst the falling petals." },
    { title: "Phantom & Nightingale", tag: "Fan Art · Arknights", img: "phantom.jpg", pos: "center 38%", link: IG + "CEwUAkqnl82PpRrRIeJ-4BqFq_HVxa8Ez_d3qA0/",
      text: "Let the world be lost to winter's chill, for betwixt his darkened cloak and her blooming grace, a secret spring abideth." },
    { title: "Bobo & Noah", tag: "Fan Art", img: "bobo.jpg", pos: "center 12%", link: IG + "CERg_2fHrXNnK7D81ZqiW8jRfPU4cT8bNcRb6Q0/",
      text: "He is the amber glow of a setting sun, fierce yet warm; she is the nightingale's grace, calm amidst the storm." },
    { title: "Lucio", tag: "Fan Art", img: "lucio.jpg", pos: "center 15%", link: IG + "B7BLUFJnjfmCJLs4k71hbqpOLTK9fclOXqFpcQ0/",
      text: "A heart of coal in a hand of light, a paradox woven by the stars themselves. He findeth beauty in the fragile pulse of mortality." },
    { title: "Gilbert & Stein", tag: "Original Character", img: "gilbert.jpg", pos: "center 25%", link: IG + "B55eyhKHH0uu-I8QvWADoUepk8fMwUsVgYjqh80/",
      text: "Two souls in midnight uniforms, bound by quiet loyalty beneath a drift of pale falling leaves." },
   
];

/* ============ 2. HELPER ============ */
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const contactLinks = () => SITE.contacts.filter(c => c.href)
    .map(c => `<a href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.label)}</a>`).join("");

const toolsList = () => SITE.tools.length ? `<p class="tools"><b>Software:</b> ${SITE.tools.map(esc).join(", ")}</p>` : "";
const igLink = a => a.link ? `<a class="view-link" href="${esc(a.link)}" target="_blank" rel="noopener">Lihat di Instagram</a>` : "";
const imgStyle = a => (a.fit ? `object-fit:${a.fit};` : "") + (a.pos ? `object-position:${a.pos};` : "");
const tagLine = a => a.tag ? `<p class="art-tag">${esc(a.tag)}</p>` : "";

const music = document.getElementById("bgMusic");
const flipSound = document.getElementById("flipSound");
let soundOn = false;

function toggleSound(btn) {
    soundOn = !soundOn;
    btn.setAttribute("aria-pressed", soundOn);
    btn.textContent = soundOn ? "♪ Musik: On" : "♪ Musik: Off";
    if (soundOn) { music.volume = 0.3; music.play().catch(() => {}); }
    else music.pause();
}

/* ============ 3. TAMPILAN HP (scroll biasa) ============ */
function buildScrollView() {
    const el = document.getElementById("scrollView");
    el.innerHTML = `
        <header class="m-hero">
            <h1 class="cinzel-font">${esc(SITE.title)}</h1>
            <p class="pinyon-font">by ${esc(SITE.by)}</p>
            <p class="m-role">${esc(SITE.role)}</p>
            <div class="divider"></div>
            <p class="playfair-font m-intro">${esc(SITE.quote)}</p>
        </header>
        <section class="m-about">
            <h2 class="cinzel-font">Tentang Saya</h2>
            <div class="divider"></div>
            <p class="playfair-font">${esc(SITE.about)}</p>
            ${toolsList()}
        </section>
        ${ARTWORKS.map(a => `
        <article class="m-art">
            <img src="${esc(a.img)}" alt="Ilustrasi digital: ${esc(a.title)}" loading="lazy">
            <h2 class="cinzel-font">${esc(a.title)}</h2>
            ${tagLine(a)}
            <p class="playfair-font">${esc(a.text)}</p>
            ${igLink(a)}
        </article>`).join("")}
        <footer class="m-footer">
            <p class="playfair-font">${esc(SITE.outro)}</p>
            <div class="contact-row">${contactLinks()}</div>
            <p class="note">${esc(SITE.note)}</p>
            <small>© ${new Date().getFullYear()} ${esc(SITE.by)}</small>
        </footer>`;
}

/* ============ 4. TAMPILAN DESKTOP (buku flip) ============ */
function buildBook() {
    const book = document.getElementById("flipBook");
    const pages = [];

    pages.push(`
        <div class="page page-cover" data-density="hard"><div class="page-content">
            <h1 class="cinzel-font">${esc(SITE.title)}</h1>
            <p class="pinyon-font">by ${esc(SITE.by)}</p>
            <div class="divider"></div>
            <p class="role-label">${esc(SITE.role)}</p>
            <small>Klik atau geser halaman untuk membuka</small>
        </div></div>`);

    pages.push(`
        <div class="page"><div class="page-content">
            <h2 class="cinzel-font">Tentang Saya</h2>
            <div class="divider"></div>
            <p class="playfair-font about-text">${esc(SITE.about)}</p>
            ${toolsList()}
            <p class="playfair-font quote">“${esc(SITE.quote)}”</p>
        </div></div>`);

    ARTWORKS.forEach(a => pages.push(`
        <div class="page"><div class="page-content layout-modern">
            <h3 class="cinzel-font">${esc(a.title)}</h3>
            ${a.tag ? tagLine(a) : '<div class="divider"></div>'}
            <div class="art-frame ${a.fit === "contain" ? "matte" : ""}"><img style="${imgStyle(a)}" src="${esc(a.img)}" alt="Ilustrasi digital: ${esc(a.title)}"></div>
            <p class="playfair-font caption">${esc(a.text)}</p>
            ${igLink(a)}
        </div></div>`));

    pages.push(`
        <div class="page"><div class="page-content">
            <h2 class="cinzel-font">The Fading Ember</h2>
            <div class="divider"></div>
            <p class="playfair-font intro-text">${esc(SITE.outro)}</p>
            <div class="contact-row">${contactLinks()}</div>
            <p class="note">${esc(SITE.note)}</p>
        </div></div>`);

    // Jumlah halaman harus genap (termasuk back cover) → tambah halaman pengisi jika perlu
    if (pages.length % 2 === 0) pages.push(`<div class="page"><div class="page-content"><p class="pinyon-font">Thank you</p><div class="divider"></div><p class="playfair-font quote">Terima kasih sudah berkunjung.</p></div></div>`);

    pages.push(`<div class="page page-cover" data-density="hard"><div class="page-content"><p class="pinyon-font">${esc(SITE.by)}</p></div></div>`);

    book.innerHTML = pages.join("");

    const pageFlip = new St.PageFlip(book, {
        width: 450, height: 600, size: "fixed",
        minWidth: 450, minHeight: 600, maxWidth: 450, maxHeight: 600,
        maxShadowOpacity: 0.8, showCover: true, mobileScrollSupport: false
    });
    pageFlip.loadFromHTML(book.querySelectorAll(".page"));

    pageFlip.on("flip", () => {
        if (!soundOn) return;
        flipSound.currentTime = 0;
        flipSound.play().catch(() => {});
    });

    // Toolbar bawah: tombol musik + kontak
    const bar = document.getElementById("toolbar");
    bar.innerHTML = `<button type="button" class="sound-btn" aria-pressed="false">♪ Musik: Off</button>${contactLinks()}`;
    bar.querySelector(".sound-btn").addEventListener("click", e => toggleSound(e.currentTarget));

    // Skala otomatis supaya muat di layar laptop manapun
    const stage = document.getElementById("stage");
    const fit = () => {
        const s = Math.min(1, innerWidth / 1040, (innerHeight - 70) / 640);
        stage.style.transform = `scale(${s})`;
    };
    fit();
    addEventListener("resize", fit);
}

/* ============ 5. PILIH TAMPILAN ============ */
const desktopQuery = matchMedia("(min-width: 821px)");
document.addEventListener("DOMContentLoaded", () => {
    if (desktopQuery.matches) buildBook(); else buildScrollView();
    // Kalau layar berubah kategori (rotate / resize besar), muat ulang tampilan
    desktopQuery.addEventListener("change", () => location.reload());
});
