document.documentElement.classList.add("js-animations");

const headline = document.querySelector(".hero-page h1");
const words = headline.textContent.trim().split(" ");
headline.textContent = "";

words.forEach(function (word, index) {
    const span = document.createElement("span");
    span.className = "word-blur";
    span.textContent = word;
    span.style.transitionDelay = (index * 0.07) + "s";
    headline.appendChild(span);
    if (index < words.length - 1) {
        headline.appendChild(document.createTextNode(" "));
    }
});

const revealTargets = document.querySelectorAll(".headline-benefit-container, #harga .text-container, .testimonial-headline-container, .hero-page .second-label, .hero-page .intro-container, .hero-page .cta-container, .hero-page .foto-container");
revealTargets.forEach(function (target) {
    target.classList.add("reveal");
});

function animatePrice(priceElement, from, to, duration) {
    const start = performance.now();
    const rafId = priceElement.dataset.rafId;
    if (rafId) {
        cancelAnimationFrame(Number(rafId));
    }
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(from + (to - from) * progress);
        priceElement.textContent = "RP " + value.toLocaleString("id-ID");
        if (progress < 1) {
            priceElement.dataset.rafId = String(requestAnimationFrame(step));
        }
    }
    priceElement.dataset.rafId = String(requestAnimationFrame(step));
}

function startCounter(card) {
    const price = card.querySelector(".price");
    const current = Number(price.textContent.replace(/[^0-9]/g, "") || 0);
    animatePrice(price, current, Number(price.dataset.target), 2400);
}

function resetCounter(card) {
    const price = card.querySelector(".price");
    const current = Number(price.textContent.replace(/[^0-9]/g, "") || 0);
    animatePrice(price, current, 0, 600);
}

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.classList.contains("product-price-container")) {
                startCounter(entry.target);
            }
        } else {
            entry.target.classList.remove("is-visible");
            if (entry.target.classList.contains("product-price-container")) {
                resetCounter(entry.target);
            }
        }
    });
}, { rootMargin: "0px 0px -12% 0px", threshold: 0 });

document.querySelectorAll(".word-blur").forEach(function (word) {
    observer.observe(word);
});

document.querySelectorAll(".reveal").forEach(function (element) {
    observer.observe(element);
});

document.querySelectorAll(".price").forEach(function (price) {
    price.dataset.target = price.textContent.replace(/[^0-9]/g, "");
});

const priceCards = document.querySelectorAll(".price-list-container article");
priceCards.forEach(function (card, index) {
    if (card.classList.contains("popular-product")) {
        card.classList.add("zoom-popular");
    } else {
        card.classList.add("zoom-card");
    }
    card.style.transitionDelay = (index * 0.15) + "s";
    observer.observe(card);
});

const reasonCards = document.querySelectorAll(".reason-container article");
const slideClasses = ["slide-left", "slide-up", "slide-right"];
reasonCards.forEach(function (card, index) {
    card.classList.add(slideClasses[index]);
    card.style.transitionDelay = (index * 0.15) + "s";
    observer.observe(card);
});

document.querySelectorAll(".testimoni-comment").forEach(function (comment) {
    const words = comment.textContent.trim().split(/\s+/);
    comment.textContent = "";
    words.forEach(function (word, index) {
        const span = document.createElement("span");
        span.className = "word-blur";
        span.textContent = word;
        span.style.transitionDelay = (index * 0.05) + "s";
        comment.appendChild(span);
        if (index < words.length - 1) {
            comment.appendChild(document.createTextNode(" "));
        }
    });
});

document.querySelectorAll(".testimoni-text-container").forEach(function (card) {
    card.classList.add("reveal");
    observer.observe(card);
});

document.querySelectorAll(".testimoni-comment .word-blur").forEach(function (word) {
    observer.observe(word);
});
