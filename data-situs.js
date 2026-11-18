/* ==========================================================
   PENGATURAN SITUS - mersonlikeit
   Edit file ini untuk:
   1. mengganti foto bagian halaman (Our Story, Hero)
   2. mengatur kartu "Jurnal Fashion" di halaman Testimoni & Blog
   ========================================================== */

const ZALFA_SITE = {

    /* ---------- FORM KONTAK ----------
       Pesan dari halaman Kontak dikirim ke email ini (lewat layanan FormSubmit).
       Ganti dengan alamat email Anda yang asli. */
    kontak: {
        emailTujuan: 'zalfafiryal19@gmail.com'
    },

    /* ---------- FOTO BAGIAN HALAMAN ----------
       Simpan foto di folder  gambar/  lalu tulis alamatnya di sini.
       Dikosongkan ('') = tampil blok warna + tulisan seperti semula. */
    foto: {
        ourStory: 'gambar/story.jpeg',  // foto "Our Story": halaman Tentang Kami + bagian Tentang di Beranda
                                         // contoh: 'gambar/our-story.jpg'
        hero: ''                          // foto kotak besar di bagian atas Beranda
    },

    /* ---------- JURNAL FASHION ----------
       Setiap kartu otomatis menjadi link yang terbuka di tab baru.
         kategori  : label kecil di atas judul
         judul     : judul kartu
         ringkasan : teks singkat di bawah judul
         link      : alamat web tujuan (harus diawali https://)
         gambar    : (opsional) foto kartu, contoh 'gambar/jurnal-1.jpg'
       Untuk menambah kartu, salin satu blok { ... } dan beri koma antar blok. */
    jurnal: [
        {
            kategori: 'Gaya',
            judul: 'Capsule Wardrobe: 10 Item Esensial',
            ringkasan: 'Bangun lemari ringkas yang tetap serbaguna untuk berbagai acara.',
            link: 'https://www.liputan6.com/hot/read/7890468/capsule-wardrobe-gen-z',
            gambar: 'gambar/wardrobe.jfif'
        },
        {
            kategori: 'Perawatan',
            judul: 'Merawat Linen Agar Awet',
            ringkasan: 'Tips mencuci dan menyimpan linen supaya tetap lembut dan rapi.',
            link: 'https://www.popbela.com/fashion/style-trends/cara-merawat-baju-berbahan-linen-n3v01-00-fzpls-bzc0ws',
            gambar: 'gambar/linen.jfif'
        },
        {
            kategori: 'Tren',
            judul: 'Palet Netral untuk Musim Ini',
            ringkasan: 'Padukan tone ivory, sand, dan charcoal dengan aksen emas.',
            link: 'https://www.popmama.com/life/fashion-and-beauty/trik-styling-outfit-warna-netral-agar-terlihat-mahal-00-fvmb5-gm99cm',
            gambar: 'gambar/palet.jfif'
        }
    ]
};
