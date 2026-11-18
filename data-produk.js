/* ==========================================================
   DATA PRODUK - mersonlikeit
   Cukup edit file ini untuk menambah / mengubah produk.
   Semua halaman (beranda, katalog, detail, keranjang) otomatis ikut berubah.

   CARA MENAMBAH FOTO
   1. Simpan foto produk ke folder  gambar/   (contoh: gambar/linen-noir.jpg)
   2. Isi  foto  dengan alamat foto tersebut:  foto: 'gambar/linen-noir.jpg'
   3. (Opsional) foto tambahan untuk halaman detail:
      galeri: ['gambar/linen-noir-2.jpg', 'gambar/linen-noir-3.jpg']
   Jika  foto  dikosongkan atau file tidak ditemukan, etalase otomatis
   memakai warna cadangan (field  warna).

   CARA MENAMBAH PRODUK
   Salin satu blok { ... } pada template di bagian paling bawah,
   tempel di dalam daftar ZALFA_PRODUCTS (jangan lupa koma antar blok),
   lalu ubah isinya. id harus unik.
   ========================================================== */

const ZALFA_PRODUCTS = [
    {
        id: 1,
        nama: 'T-Shirt Flowers Tee',
        kat: 'Atasan',
        harga: 130000,
        tag: 'Baru',
        ukuran: ['S', 'M', 'L', 'XL'],
        desk: 'Oversize Shirt dengan bahan katun kualitas premium american coolbreazee.',
        foto: 'gambar/flowers-front.jpeg',     // contoh: 'gambar/contoh.jpg'
        galeri: ['gambar/flowers-back.jpeg'],
        warna: ['#ffffff']
    },
    {
        id: 2,
        nama: 'T-Shirt Oversized 777 Tee',
        kat: 'Atasan',
        harga: 135000,
        tag: 'Terlaris',
        ukuran: ['XS', 'S', 'M', 'L','XL'],
        desk: 'T-Shirt dengan kualitas kain katun berkualitas dengan gramasi 16s.',
        foto: 'gambar/777-front.jpeg',
        galeri: ['gambar/777-back.jpeg'],
        warna: ['#ffffff']
    },
    {
        id: 3,
        nama: 'T-Shirt The Stallion Tee 16s ',
        kat: 'Atasan',
        harga: 160000,
        tag: 'Terbaik',
        ukuran: ['S', 'M', 'L', 'XL'],
        desk: 'T-Shirt dengan kualitas kain katun berkualitas dengan gramasi 16s.',
        foto: 'gambar/stallion-front.jpeg',
        galeri: ['gambar/stallion-back.jpeg'],
        warna: ['#ffffff']
    },
    {
        id: 4,
        nama: "T-Shirt Mama's Art 16s",
        kat: 'Atasan',
        harga: 12000,
        tag: 'LIMITED',
        ukuran: ['XS', 'S', 'M', 'L'],
        desk: 'T-Shirt dengan kualitas kain katun berkualitas dengan gramasi 16s.',
        foto: 'gambar/mama-front.jpeg',
        galeri: ['gambar/mama-back.jpeg'],
        warna: ['#ffffff']
    },
    {
        id: 5,
        nama: 'T-Shirt Broken Bones Tee 16s',
        kat: 'Atasan',
        harga: 140000,
        tag: 'Limited',
        ukuran: ['S', 'M', 'L', 'XL'],
        desk: 'T-Shirt dengan kualitas kain katun berkualitas dengan gramasi 16s.',
        foto: 'gambar/bone-front.jpeg',
        galeri: ['gambar/bone-back.jpeg'],
        warna: ['#ffffff']
    },
    {
        id: 6,
        nama: 'Leather Jacket Unisex',
        kat: 'Outerwear',
        harga: 778000,
        tag: 'NEW ARRIVAL',
        ukuran: ['S', 'M', 'L'],
        desk: 'Leather Jacket dengan kulit sapi asli.',
        foto: 'gambar/leather2.png',
        galeri: [],
        warna: ['#ffffff']
    },

    {
        id: 7,
        nama: 'Mersonlikeit - Basica Man Wide Leg - Blue Denim Jeans',
        kat: 'Celana',
        harga: 266000,
        tag: 'NEW ARRIVAL',
        ukuran: ['28', '29', '30', '31', '32'],
        desk: 'Mid-waist jeans with a five-pocket design. Featuring an extra-long wide-leg. Inspired by 90s pants used 13 oz mid weight basic denim.',
        foto: 'gambar/pants2.png',
        galeri: [],
        warna: ['#ffffff']
    },

    {
        id: 8,
        nama: 'Mersonlikeit - Leather Jacket Vol.2 Haloween Edition',
        kat: 'Outerwear',
        harga: 899000,
        tag: 'NEW ARRIVAL',
        ukuran: ['S', 'M', 'L'],
        desk: 'Leather Jacket dengan kulit sapi asli.',
        foto: 'gambar/halo-front.png',
        galeri: ['gambar/halo-back.png'],
       warna: ['#ffffff']
    }

    /* ---------- TEMPLATE PRODUK BARU (salin, hapus tanda komentar) ----------
    ,{
        id: 7,
        nama: 'Nama Produk',
        kat: 'Atasan',                 // kategori; otomatis jadi tombol filter di katalog
        harga: 399000,
        tag: 'Baru',                   // label kecil di foto, '' jika tidak ada
        ukuran: ['S', 'M', 'L'],
        desk: 'Deskripsi singkat produk.',
        foto: 'gambar/nama-foto.jpg',
        galeri: [],
        warna: ['#2a231b', '#4a3d2c']  // warna cadangan jika foto kosong
    }
    ------------------------------------------------------------------------- */
];
