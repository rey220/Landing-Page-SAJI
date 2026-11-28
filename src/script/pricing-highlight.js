const tautanFooter = document.querySelectorAll(".footer-page a[data-paket]");
const kartuHarga = document.querySelectorAll(".price-list-container .product-price-container");
const labelPopuler = document.querySelector(".popular-text");

function pindahBingkai(kunci) {
    const kartuTujuan = document.querySelector('.price-list-container .product-price-container[data-paket="' + kunci + '"]');
    if (!kartuTujuan) {
        return;
    }
    kartuHarga.forEach(function (kartu) {
        kartu.classList.remove("popular-product");
        kartu.classList.remove("zoom-popular");
        kartu.classList.add("zoom-card");
    });
    kartuTujuan.classList.add("popular-product");
    kartuTujuan.classList.remove("zoom-card");
    kartuTujuan.classList.add("zoom-popular");
    const namaPaket = kartuTujuan.querySelector(".packet-name");
    if (labelPopuler && namaPaket) {
        namaPaket.after(labelPopuler);
    }
}

tautanFooter.forEach(function (tautan) {
    tautan.addEventListener("click", function () {
        pindahBingkai(tautan.dataset.paket);
    });
});
