/* main.js
  1) Install modules from npm: $ npm install jquery --save
  2) Import from node_modules folder: import $ from 'jquery'
  3) Import your own compnents: import component from './path/to/component'
*/
// import inView from 'in-view';

(() => {
  const overlayContainer = document.querySelector('.overlay-container');
  const overlay = document.querySelector('.overlay');
  const imgTitle = document.querySelector('.img-title');
  const portfolioItem = document.querySelectorAll('.portfolio-item');
  const body = document.querySelector('body');
  const currentPage = body.getAttribute('data-page');
  const portfolioTransition = document.querySelector('#portfolio-transition');
  const transitionalBgImg = document.querySelector('.transitional-bg-img');
  const portfolioLink = document.querySelectorAll('.portfolio-link');
  const navLink = document.querySelectorAll('.nav-link');
  const aboutLink = document.querySelectorAll('.about-link');
  const portfolioSection = document.querySelectorAll('.portfolio-section');
  const homePage = document.querySelector('.home-page');
  const customIntro = document.querySelector('.custom-intro');

  let selectedItem;
  let selectBg;
  let selectHref;
  let title;
  let imgOverlay = false;

  // REMOVE CLASS
  const removeClass = (el, className) => {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className += ` ${className}`;
    }
  };

  // ADD CLASS
  const addClass = (el, className) => {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ` ${className}`;
    }
  };

  // close overlay
  const closeOverlay = () => {
    while (overlayContainer.firstChild) {
      overlayContainer.removeChild(overlayContainer.firstChild);
      removeClass(overlay, 'active-overlay');
    }
    imgOverlay = false;
  };

  // preload nav image
  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  let lastKnownScrollPosition = 0;
  let ticking = false;
  const description = document.querySelector('.description');

  let newOpacity;
  let opacityNumber;
  let newBottom;

  function doSomething(scrollPos) {
    newOpacity = 1 - (scrollPos * 0.01);
    opacityNumber = Math.max(newOpacity.toFixed(2), 0);
    newBottom = scrollPos + 30;
    description.setAttribute('style', `opacity: ${opacityNumber}; bottom: ${newBottom}px;`);
  }

  window.addEventListener('scroll', () => {
    // close overlay on scroll
    if (imgOverlay === true) {
      closeOverlay();
    }

    // fadeout description on scroll
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        doSomething(lastKnownScrollPosition);
        ticking = false;
      });
    }
    ticking = true;
  });

  // clone image, open overlay insert name
  const portfolioItemSelect = (selectedPortfolioItem) => {
    Array.prototype.forEach.call(selectedPortfolioItem, (el, i) => {
      selectedPortfolioItem[i].addEventListener('click', () => {
        const clone = el.cloneNode();
        overlayContainer.appendChild(clone);
        addClass(overlay, 'active-overlay');
        title = el.getAttribute('title');
        imgTitle.innerHTML = title;
        imgOverlay = true;
      }, false);
    });
  };

  // close overlay on click
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeOverlay();
    }, false);
  }

  // transition from homepage to portfolio pages
  const homePortfolioTransition = (selectedPortfolioItem) => {
    Array.prototype.forEach.call(selectedPortfolioItem, (el, i) => {
      selectedPortfolioItem[i].addEventListener('click', (e) => {
        e.preventDefault();
        selectedItem = el.querySelector('.select');
        selectBg = selectedItem.getAttribute('src');
        selectHref = el.getAttribute('href');
        addClass(body, 'screen-transitioning');
        addClass(portfolioTransition, 'active');
        transitionalBgImg.setAttribute('style', `background-image: url(${selectBg});`);
        const link = document.createElement('link');
        link.href = selectHref;
        link.rel = 'dns-prefetch';

        document.getElementsByTagName('head')[0].appendChild(link);
        window.setTimeout(() => { window.location = selectHref; }, 2200);
      }, false);
    });
  };

  const portfolioNavTransition = (selectedNavItem) => {
    Array.prototype.forEach.call(selectedNavItem, (el, i) => {
      selectedNavItem[i].addEventListener('click', (e) => {
        e.preventDefault();
        selectHref = el.getAttribute('href');
        const link = document.createElement('link');
        const preloadTransitionImage = el.getAttribute('data-transitionImg');
        link.href = selectHref;
        link.rel = 'prerender';
        addClass(body, 'screen-transitioning');
        addClass(portfolioTransition, 'active');
        transitionalBgImg.setAttribute('style', `background-image: url(${preloadTransitionImage});`);
        window.setTimeout(() => { window.location = selectHref; }, 2200);
      }, false);
    });
  };

  const aboutPageTransition = (aboutLink) => {
    Array.prototype.forEach.call(aboutLink, (el, i) => {
      aboutLink[i].addEventListener('click', (e) => {
        e.preventDefault();
        selectHref = el.getAttribute('href');
        addClass(body, 'screen-transitioning');
        addClass(portfolioTransition, 'active');
        portfolioTransition.setAttribute('style', 'background: #cccccc');
        transitionalBgImg.setAttribute('style', 'background-image: url(/img/worldsgame/19.jpg);');
        window.setTimeout(() => { window.location = selectHref; }, 2200);
      }, false);
    });
  };

  // homepage cursor follow
  const portfolioSectionHover = () => {
    if (homePage) {
      Array.prototype.forEach.call(portfolioSection, (el, i) => {
        portfolioSection[i].addEventListener('mouseover', () => {
          const activeCursor = el.querySelector('.cursor-follow');
          addClass(activeCursor, 'active');
        });
        portfolioSection[i].addEventListener('mouseout', () => {
          const activeCursor = el.querySelector('.cursor-follow');
          removeClass(activeCursor, 'active');
        });
      });
    }
  };

  document.addEventListener('mousemove', (e) => {
    if (homePage) {
      const activePortfolioHover = document.querySelectorAll('.cursor-follow.active');
      Array.prototype.forEach.call(activePortfolioHover, (el) => {
        el.setAttribute('style', `left: ${e.pageX}px; top: ${e.pageY}px;`);
      });
    }
  });

  // customize about page to someone
  const getParameterByName = (name, url) => {
    if (!url) {
      url = window.location.href;
      name = name.replace(/[\[\]]/g, `\\$&`);
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
      results = regex.exec(url);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  };

  // current page nav
  const checkCurrentPage = () => {
    if (currentPage !== 'home') {
      const activeNav = document.querySelector(`.nav-${currentPage}`);
      addClass(activeNav, 'current');
    }
    if (currentPage === 'home') {
      const name = getParameterByName('to');
      if (name) {
        customIntro.innerHTML = `Hi, ${name}`;
      }
    }
  };

  aboutPageTransition(aboutLink);
  portfolioNavTransition(navLink);
  homePortfolioTransition(portfolioLink);
  portfolioItemSelect(portfolioItem);
  portfolioSectionHover();
  checkCurrentPage();
})();
