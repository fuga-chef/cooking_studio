class Main {
  #observers = [];

  constructor() {
    this.header = document.querySelector(".header");
    this.hero = new HeroSlider(".swiper");
    this.sides = document.querySelectorAll(".side");
    this.#init();
  }

  //監視を切る
  destroy() {
    this.#observers.forEach((so) => so.destroy());
  }

  #init() {
    new MobileMenu();
    Pace.on("done", this.#scrollInit.bind(this));
  }

  #scrollInit() {
    this.#observers.push(new ScrollObserver("#main-content", this.#sideAnimation.bind(this), { once: false, rootMargin: "-300px 0px" }), new ScrollObserver(".nav-trigger", this.#navAnimation.bind(this), { once: false }), new ScrollObserver(".cover-slide", this.#inviewAnimation), new ScrollObserver(".appear", this.#inviewAnimation), new ScrollObserver(".animate-title", this.#textAnimation), new ScrollObserver(".swiper", this.#toggleSlideAnimation.bind(this), { once: false }));
  }

  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  #sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach((side) => side.classList.add("inview"));
    } else {
      this.sides.forEach((side) => side.classList.remove("inview"));
    }
  }

  #inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }

  #textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  #toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }
}

new Main();
