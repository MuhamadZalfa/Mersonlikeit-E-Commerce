/* MERSONLIKEIT — Vanilla JS
   Data produk ada di data-produk.js (dimuat sebelum file ini). */
const zalfa_rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const zalfa_grad = p => `linear-gradient(150deg,${p.warna[0]},${p.warna[1]})`;
const zalfa_qs = (s, r = document) => r.querySelector(s);

/* ---------- Foto produk ---------- */
// Semua foto sebuah produk: foto utama + galeri (yang kosong dibuang)
const zalfa_fotos = p => [p.foto, ...(p.galeri || [])].filter(Boolean);
// Jika file foto tidak ditemukan, <img> dihapus dan warna cadangan tampil
const zalfa_img = (src, alt) => `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()">`;

/* ---------- Keranjang (localStorage) ---------- */
const zalfa_getCart = () => { 
    try { 
        return JSON.parse(localStorage.getItem('zalfa_cart')) || []; 
    } catch { 
        return []; 
    } 
};

const zalfa_setCart = c => { 
    localStorage.setItem('zalfa_cart', JSON.stringify(c)); 
    zalfa_badge(); 
};

function zalfa_badge() { 
    const b = zalfa_qs('#zalfa_cart_badge'); 
    if (b) b.textContent = zalfa_getCart().reduce((s, i) => s + i.qty, 0); 
}

function zalfa_toast(msg) { 
    const t = zalfa_qs('#zalfa_toast'); 
    t.textContent = msg; 
    t.classList.add('zalfa_show'); 
    setTimeout(() => t.classList.remove('zalfa_show'), 2400); 
}

function zalfa_add(id, size, qty = 1) {
    const p = ZALFA_PRODUCTS.find(x => x.id === id); 
    size = size || p.ukuran[0];
    const cart = zalfa_getCart(); 
    const ex = cart.find(i => i.id === id && i.size === size);
    ex ? ex.qty += qty : cart.push({ id, size, qty });
    zalfa_setCart(cart); 
    zalfa_toast(p.nama + ' ditambahkan ke keranjang');
}

/* ---------- Kartu produk ---------- */
function zalfa_card(p) {
    // Foto kedua (galeri pertama) dipakai untuk efek hover di etalase
    const alt = p.foto && p.galeri && p.galeri[0]
        ? `<img class="zalfa_img_alt" src="${p.galeri[0]}" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()">`
        : '';
    return `<article class="zalfa_product_card zalfa_reveal">
    <a href="detail.html?id=${p.id}" class="zalfa_product_img" style="background:${zalfa_grad(p)}">
      ${p.tag ? `<span class="zalfa_tag">${p.tag}</span>` : ''}<b>${p.nama.charAt(0)}</b>${p.foto ? zalfa_img(p.foto, p.nama) : ''}${alt}</a>
    <div class="zalfa_product_body">
      <span class="zalfa_product_cat">${p.kat}</span>
      <h3 class="zalfa_product_name">${p.nama}</h3>
      <p class="zalfa_price">${zalfa_rupiah(p.harga)}</p>
      <div class="zalfa_product_actions">
        <a href="detail.html?id=${p.id}" class="zalfa_btn zalfa_btn_ghost">Detail</a>
        <button class="zalfa_btn" data-zalfa-add="${p.id}">+ Keranjang</button>
      </div></div></article>`;
}

function zalfa_renderGrid(el, list) { 
    el.innerHTML = list.map(zalfa_card).join(''); 
    zalfa_observe(); 
}

/* ---------- Halaman ---------- */
function zalfa_initHome() { 
    const g = zalfa_qs('#zalfa_featured_grid'); 
    const unggulan = [1, 2, 5, 8];   // <-- ganti angka ini dengan id produk pilihanmu
    if (g) {
        const pilihan = unggulan
            .map(id => ZALFA_PRODUCTS.find(p => p.id === id))
            .filter(Boolean);
        zalfa_renderGrid(g, pilihan);
    }
}

function zalfa_initCatalog() {
    const g = zalfa_qs('#zalfa_catalog_grid'), bar = zalfa_qs('#zalfa_filter_bar');
    const cats = ['Semua', ...new Set(ZALFA_PRODUCTS.map(p => p.kat))];
    bar.innerHTML = cats.map((c, i) => `<button class="zalfa_filter_btn ${i ? '' : 'zalfa_active'}" data-zalfa-cat="${c}">${c}</button>`).join('');
    zalfa_renderGrid(g, ZALFA_PRODUCTS);
    bar.addEventListener('click', e => {
        const b = e.target.closest('[data-zalfa-cat]'); 
        if (!b) return;
        bar.querySelectorAll('.zalfa_filter_btn').forEach(x => x.classList.remove('zalfa_active')); 
        b.classList.add('zalfa_active');
        const c = b.dataset.zalfaCat; 
        zalfa_renderGrid(g, c === 'Semua' ? ZALFA_PRODUCTS : ZALFA_PRODUCTS.filter(p => p.kat === c));
    });
}

function zalfa_initDetail() {
    const wrap = zalfa_qs('#zalfa_detail_wrap');
    const id = parseInt(new URLSearchParams(location.search).get('id')) || 1;
    const p = ZALFA_PRODUCTS.find(x => x.id === id) || ZALFA_PRODUCTS[0];
    let size = p.ukuran[0], qty = 1;
    const tones = [zalfa_grad(p), `linear-gradient(210deg,${p.warna[1]},${p.warna[0]})`, `linear-gradient(90deg,${p.warna[0]},#17130f)`];
    const photos = zalfa_fotos(p);
    const multi = photos.length > 1;

    // Galeri foto: slider yang bisa digeser (swipe / drag / panah / thumbnail).
    // Jika produk belum punya foto, tampil blok warna seperti biasa.
    const gallery = photos.length
        ? `<div class="zalfa_slider" id="zalfa_slider" style="background:${tones[0]}">
            <div class="zalfa_slides" id="zalfa_slides">
              ${photos.map(src => `<div class="zalfa_slide">${zalfa_img(src, p.nama)}</div>`).join('')}
            </div>
            ${multi ? `<button class="zalfa_slider_btn zalfa_slider_prev" data-zalfa-go="-1" aria-label="Foto sebelumnya">&lsaquo;</button>
            <button class="zalfa_slider_btn zalfa_slider_next" data-zalfa-go="1" aria-label="Foto berikutnya">&rsaquo;</button>
            <span class="zalfa_slider_count" id="zalfa_slider_count">1 / ${photos.length}</span>` : ''}
          </div>`
        : `<div class="zalfa_gallery_main" id="zalfa_gallery_main" style="background:${tones[0]}">${p.nama.charAt(0)}</div>`;

    const thumbs = photos.length
        ? (multi ? photos.map((src, i) => `<div class="zalfa_thumb ${i ? '' : 'zalfa_active'}" data-zalfa-tone="${i}">${zalfa_img(src, p.nama)}</div>`).join('') : '')
        : tones.map((t, i) => `<div class="zalfa_thumb ${i ? '' : 'zalfa_active'}" data-zalfa-tone="${i}" style="background:${t}"></div>`).join('');

    wrap.innerHTML = `
    <div class="zalfa_gallery">${gallery}
      ${thumbs ? `<div class="zalfa_thumbs">${thumbs}</div>` : ''}</div>
    <div><span class="zalfa_eyebrow">${p.kat}</span><h1 class="zalfa_title">${p.nama}</h1>
      <p class="zalfa_price" style="font-size:1.5rem">${zalfa_rupiah(p.harga)}</p>
      <p class="zalfa_lead" style="margin:16px 0 26px">${p.desk}</p>
      <span class="zalfa_eyebrow">Ukuran</span>
      <div class="zalfa_size_row" id="zalfa_size_row">${p.ukuran.map((s, i) => `<button class="zalfa_size ${i ? '' : 'zalfa_active'}" data-zalfa-size="${s}">${s}</button>`).join('')}</div>
      <span class="zalfa_eyebrow">Jumlah</span>
      <div><div class="zalfa_qty"><button id="zalfa_dec">−</button><span id="zalfa_qty_val">1</span><button id="zalfa_inc">+</button></div></div>
      <div class="zalfa_hero_actions"><button class="zalfa_btn" id="zalfa_add_detail">Tambah ke Keranjang</button><a href="katalog.html" class="zalfa_btn zalfa_btn_ghost">Kembali</a></div>
    </div>`;
    const main = zalfa_qs('#zalfa_gallery_main');
    const slides = zalfa_qs('#zalfa_slides');
    let current = 0;

    function setActive(i) {
        current = i;
        wrap.querySelectorAll('.zalfa_thumb').forEach((x, k) => x.classList.toggle('zalfa_active', k === i));
        const c = zalfa_qs('#zalfa_slider_count');
        if (c) c.textContent = (i + 1) + ' / ' + photos.length;
    }
    function goTo(i) {
        i = Math.max(0, Math.min(photos.length - 1, i));
        slides.scrollTo({ left: slides.clientWidth * i, behavior: 'smooth' });
        setActive(i);
    }

    if (slides && multi) {
        // geser dengan jari/trackpad (scroll-snap) -> sinkronkan thumbnail & penghitung
        slides.addEventListener('scroll', () => {
            const i = Math.round(slides.scrollLeft / slides.clientWidth);
            if (i !== current) setActive(i);
        });
        // geser dengan mouse (drag)
        let down = false, startX = 0, startLeft = 0;
        slides.addEventListener('pointerdown', e => {
            if (e.pointerType !== 'mouse') return;
            down = true; startX = e.clientX; startLeft = slides.scrollLeft;
            slides.classList.add('zalfa_dragging');
        });
        window.addEventListener('pointermove', e => {
            if (down) slides.scrollLeft = startLeft - (e.clientX - startX);
        });
        window.addEventListener('pointerup', () => {
            if (!down) return;
            down = false;
            slides.classList.remove('zalfa_dragging');
            goTo(Math.round(slides.scrollLeft / slides.clientWidth));
        });
        // panah keyboard & perubahan ukuran layar
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        });
        window.addEventListener('resize', () => { slides.scrollLeft = slides.clientWidth * current; });
    }

    wrap.addEventListener('click', e => {
        const t = e.target.closest('[data-zalfa-tone]'), s = e.target.closest('[data-zalfa-size]'), g = e.target.closest('[data-zalfa-go]');
        if (g) goTo(current + parseInt(g.dataset.zalfaGo));
        if (t) {
            if (photos.length) goTo(parseInt(t.dataset.zalfaTone));
            else { main.style.background = tones[t.dataset.zalfaTone]; setActive(parseInt(t.dataset.zalfaTone)); }
        }
        if (s) { size = s.dataset.zalfaSize; wrap.querySelectorAll('.zalfa_size').forEach(x => x.classList.remove('zalfa_active')); s.classList.add('zalfa_active'); }
    });
    zalfa_qs('#zalfa_inc').onclick = () => { qty++; zalfa_qs('#zalfa_qty_val').textContent = qty; };
    zalfa_qs('#zalfa_dec').onclick = () => { if (qty > 1) qty--; zalfa_qs('#zalfa_qty_val').textContent = qty; };
    zalfa_qs('#zalfa_add_detail').onclick = () => zalfa_add(p.id, size, qty);
    document.title = p.nama + ' — mersonlikeit';
}

function zalfa_initCart() {
    const list = zalfa_qs('#zalfa_cart_list'), sum = zalfa_qs('#zalfa_cart_summary');
    function draw() {
        const cart = zalfa_getCart();
        if (!cart.length) { 
            list.innerHTML = '<div class="zalfa_empty"><p>Keranjang Anda masih kosong.</p><br><a href="katalog.html" class="zalfa_btn">Jelajahi Koleksi</a></div>'; 
            sum.style.display = 'none'; 
            return; 
        }
        sum.style.display = 'block';
        list.innerHTML = cart.map((it, idx) => { 
            const p = ZALFA_PRODUCTS.find(x => x.id === it.id);
            return `<div class="zalfa_cart_item"><div class="zalfa_cart_thumb" style="background:${zalfa_grad(p)}">${p.foto ? zalfa_img(p.foto, p.nama) : ''}</div>
            <div><h3 class="zalfa_product_name" style="font-size:1.2rem">${p.nama}</h3><span class="zalfa_product_cat">Ukuran ${it.size}</span><br>
              <div class="zalfa_qty"><button data-zalfa-q="-1" data-i="${idx}">−</button><span>${it.qty}</span><button data-zalfa-q="1" data-i="${idx}">+</button></div><br>
              <button class="zalfa_remove" data-zalfa-rm="${idx}">Hapus</button></div>
            <strong>${zalfa_rupiah(p.harga * it.qty)}</strong></div>`; 
        }).join('');
        const sub = cart.reduce((s, it) => s + ZALFA_PRODUCTS.find(x => x.id === it.id).harga * it.qty, 0), ongkir = sub > 1500000 ? 0 : 25000;
        zalfa_qs('#zalfa_sub').textContent = zalfa_rupiah(sub);
        zalfa_qs('#zalfa_ongkir').textContent = ongkir ? zalfa_rupiah(ongkir) : 'Gratis';
        zalfa_qs('#zalfa_total').textContent = zalfa_rupiah(sub + ongkir);
    }
    list.addEventListener('click', e => {
        const c = zalfa_getCart(), q = e.target.closest('[data-zalfa-q]'), r = e.target.closest('[data-zalfa-rm]');
        if (q) { const it = c[q.dataset.i]; it.qty += parseInt(q.dataset.zalfaQ); if (it.qty < 1) it.qty = 1; zalfa_setCart(c); draw(); }
        if (r) { c.splice(r.dataset.zalfaRm, 1); zalfa_setCart(c); draw(); }
    });
    zalfa_qs('#zalfa_checkout_form').addEventListener('submit', e => {
        e.preventDefault();
        zalfa_setCart([]); 
        draw(); 
        e.target.reset();
        zalfa_toast('Pesanan berhasil! Terima kasih telah berbelanja di mersonlikeit.');
    });
    draw();
}

function zalfa_initContact() {
    const f = zalfa_qs('#zalfa_contact_form');
    f.addEventListener('submit', e => {
        e.preventDefault(); 
        let ok = true;
        const rules = { nama: v => v.trim().length >= 3, email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), subjek: v => v !== '', pesan: v => v.trim().length >= 10 };
        const msg = { nama: 'Nama minimal 3 karakter', email: 'Format email tidak valid', subjek: 'Pilih subjek pesan', pesan: 'Pesan minimal 10 karakter' };
        Object.keys(rules).forEach(k => { 
            const el = f.elements[k], err = zalfa_qs('#zalfa_err_' + k);
            const valid = rules[k](el.value); 
            err.textContent = valid ? '' : msg[k]; 
            if (!valid) ok = false; 
        });
        if (!ok) return;
        const tujuan = (typeof ZALFA_SITE !== 'undefined' && ZALFA_SITE.kontak && ZALFA_SITE.kontak.emailTujuan) || '';
        if (!tujuan || tujuan.includes('GANTI_DENGAN')) {
            zalfa_toast('Email tujuan belum diatur di data-situs.js');
            return;
        }
        const d = Object.fromEntries(new FormData(f));
        const btn = f.querySelector('button[type="submit"]');
        const label = btn.textContent;
        btn.disabled = true; btn.textContent = 'Mengirim...';
        fetch('https://formsubmit.co/ajax/' + encodeURIComponent(tujuan), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                Nama: d.nama,
                Email: d.email,
                Subjek: d.subjek,
                Pesan: d.pesan,
                _subject: 'Pesan baru mersonlikeit: ' + d.subjek,
                _replyto: d.email,
                _template: 'table',
                _captcha: 'false'
            })
        })
        .then(r => r.json().then(j => ({ ok: r.ok && String(j.success) !== 'false', j })))
        .then(({ ok }) => {
            if (!ok) throw new Error('gagal');
            f.reset();
            zalfa_toast('Pesan terkirim. Kami akan membalas secepatnya.');
        })
        .catch(() => zalfa_toast('Pesan gagal terkirim. Coba lagi beberapa saat.'))
        .finally(() => { btn.disabled = false; btn.textContent = label; });
    });
}

/* ---------- Pengaturan situs (data-situs.js) ---------- */
// Elemen ber-atribut data-zalfa-foto="kunci" diisi foto dari ZALFA_SITE.foto[kunci]
function zalfa_initSite() {
    if (typeof ZALFA_SITE === 'undefined') return;
    document.querySelectorAll('[data-zalfa-foto]').forEach(el => {
        const src = (ZALFA_SITE.foto || {})[el.dataset.zalfaFoto];
        if (src) el.insertAdjacentHTML('beforeend', zalfa_img(src, el.dataset.zalfaFoto));
    });
}

// Jurnal Fashion: setiap kartu menuju link artikelnya (tab baru)
function zalfa_initJournal() {
    const g = zalfa_qs('#zalfa_journal_grid');
    if (!g || typeof ZALFA_SITE === 'undefined') return;
    g.innerHTML = (ZALFA_SITE.jurnal || []).map(j => `
        <a class="zalfa_blog_card zalfa_reveal" href="${j.link}" target="_blank" rel="noopener noreferrer">
            <div class="zalfa_blog_img">${j.gambar ? zalfa_img(j.gambar, j.judul) : ''}</div>
            <div class="zalfa_blog_body">
                <span class="zalfa_product_cat">${j.kategori}</span>
                <h3>${j.judul}</h3>
                <p>${j.ringkasan}</p>
                <span class="zalfa_blog_more">Baca selengkapnya &rarr;</span>
            </div>
        </a>`).join('');
    zalfa_observe();
}

/* ---------- Global ---------- */
function zalfa_observe() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('zalfa_visible'); io.unobserve(e.target); } }), { threshold: .12 });
    document.querySelectorAll('.zalfa_reveal:not(.zalfa_visible)').forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    const header = zalfa_qs('#zalfa_header'), menu = zalfa_qs('#zalfa_menu');
    const onScroll = () => header.classList.toggle('zalfa_scrolled', scrollY > 40); 
    onScroll(); 
    addEventListener('scroll', onScroll);
    zalfa_qs('#zalfa_burger').addEventListener('click', () => menu.classList.toggle('zalfa_open'));
    menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('zalfa_open'); });
    document.addEventListener('click', e => { const b = e.target.closest('[data-zalfa-add]'); if (b) zalfa_add(parseInt(b.dataset.zalfaAdd)); });
    const nf = zalfa_qs('#zalfa_news_form'); 
    if (nf) nf.addEventListener('submit', e => { e.preventDefault(); nf.reset(); zalfa_toast('Terima kasih telah berlangganan.'); });
    zalfa_badge();
    zalfa_initSite();
    const page = document.body.dataset.zalfaPage;
    ({ home: zalfa_initHome, katalog: zalfa_initCatalog, detail: zalfa_initDetail, keranjang: zalfa_initCart, kontak: zalfa_initContact, testimoni: zalfa_initJournal }[page] || (() => {}))();
    zalfa_observe();
});