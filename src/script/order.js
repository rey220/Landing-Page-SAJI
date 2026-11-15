// order.js — pemantik interaksi halaman Pesan Saji.
// Tugas file ini cuma tiga: baca isi form, hitung total, lalu rangkai link wa.me.

// Nomor WhatsApp penjual yang menerima pesanan.
// Formatnya: kode negara tanpa tanda +, tanpa 0 di depan.
// Jangan pakai spasi atau tanda - di dalam nomor.
const NOMOR_PENJUAL = "628996946557";

// Daftar paket, kuncinya sama dengan data-paket di order.html
// dan sama dengan ?paket= di link "Pilih Paket" pada index.html.
const DAFTAR_PAKET = {
    "satuan":  { nama: "Satuan",  harga: 25000 },
    "paket-3": { nama: "Paket 3", harga: 69000 },
    "paket-6": { nama: "Paket 6", harga: 129000 },
};

// Pilihan pembeli saat ini. Awalnya Paket 6, sama seperti di HTML.
let paketTerpilih = "paket-6";
let jumlah = 1;

// Ambil semua elemen yang akan dibaca dan diubah.
const paketElemen = document.querySelectorAll(".package-price-container");
const jumlahNilai = document.getElementById("jumlah-nilai");
const ringkasanPaket = document.getElementById("ringkasan-paket");
const ringkasanHarga = document.getElementById("ringkasan-harga");
const subtotalHarga = document.getElementById("subtotal-harga");
const totalHarga = document.getElementById("total-harga");
const inputNama = document.getElementById("nama");
const inputWa = document.getElementById("wa");
const inputCatatan = document.getElementById("catatan");

// Ubah angka jadi tulisan rupiah, contoh: 129000 jadi "Rp 129.000".
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Tulis ulang ringkasan di kanan setiap kali paket atau jumlah berubah.
function perbaruiRingkasan() {
    const paket = DAFTAR_PAKET[paketTerpilih];
    const total = paket.harga * jumlah;
    jumlahNilai.textContent = jumlah;
    ringkasanPaket.textContent = paket.nama + " x " + jumlah;
    ringkasanHarga.textContent = formatRupiah(total);
    subtotalHarga.textContent = formatRupiah(total);
    totalHarga.textContent = formatRupiah(total);
}

// Tandai paket yang diklik sebagai yang terpilih, lalu perbarui ringkasan.
function pilihPaket(kunci) {
    if (!DAFTAR_PAKET[kunci]) {
        return;
    }
    paketTerpilih = kunci;
    paketElemen.forEach(function (elemen) {
        elemen.classList.toggle("selected", elemen.dataset.paket === kunci);
    });
    perbaruiRingkasan();
}

// Setiap kartu paket bisa diklik, dan bisa juga dipilih dengan keyboard (Enter / spasi).
paketElemen.forEach(function (elemen) {
    elemen.addEventListener("click", function () {
        pilihPaket(elemen.dataset.paket);
    });
    elemen.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            pilihPaket(elemen.dataset.paket);
        }
    });
});

// Tombol - : jumlah turun, tapi tidak boleh di bawah 1.
document.getElementById("btn-kurang").addEventListener("click", function () {
    if (jumlah > 1) {
        jumlah = jumlah - 1;
        perbaruiRingkasan();
    }
});

// Tombol + : jumlah naik satu.
document.getElementById("btn-tambah").addEventListener("click", function () {
    jumlah = jumlah + 1;
    perbaruiRingkasan();
});

// Kalau pembeli datang dari tombol "Pilih Paket" di halaman utama,
// linknya membawa ?paket=satuan / ?paket=paket-3 / ?paket=paket-6.
// Baca itu, lalu tandai paketnya dari awal.
const paketDariLink = new URLSearchParams(window.location.search).get("paket");
if (paketDariLink) {
    pilihPaket(paketDariLink);
}

// Rangkai pesan WhatsApp dari isi form, lalu buka chat penjual.
document.getElementById("btn-pesan").addEventListener("click", function () {
    const nama = inputNama.value.trim();
    const wa = inputWa.value.trim();
    const catatan = inputCatatan.value.trim();

    // Nama dan nomor WA wajib diisi, kalau tidak, berhenti di sini.
    if (!nama || !wa) {
        alert("Isi dulu nama dan nomor WhatsApp kamu ya.");
        if (!nama) {
            inputNama.focus();
        } else {
            inputWa.focus();
        }
        return;
    }

    const paket = DAFTAR_PAKET[paketTerpilih];
    const total = paket.harga * jumlah;

    // Susun pesan baris per baris, lalu ubah jadi aman untuk link.
    const barisPesan = [
        "Halo Saji, saya mau pesan:",
        "",
        "Paket: " + paket.nama,
        "Jumlah: " + jumlah,
        "Total: " + formatRupiah(total),
        "Nama: " + nama,
        "Nomor WhatsApp: " + wa,
        "Catatan: " + (catatan || "-"),
    ];
    const pesan = encodeURIComponent(barisPesan.join("\n"));

    window.open("https://wa.me/" + NOMOR_PENJUAL + "?text=" + pesan, "_blank");
});

// Link "Atau chat langsung tanpa isi form": langsung ke chat penjual
// dengan pesan pembuka yang sudah disiapkan.
document.getElementById("chat-langsung").href =
    "https://wa.me/" + NOMOR_PENJUAL + "?text=" +
    encodeURIComponent("Halo Saji, saya mau tanya-tanya dulu.");

// Tampilkan ringkasan pertama kali halaman dibuka.
perbaruiRingkasan();
