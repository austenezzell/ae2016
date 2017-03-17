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
  const slide = document.querySelectorAll('.slide');
  const slideContent = document.querySelectorAll('.slide-content');
  const currentSlideTitle = document.querySelector('.slide-title');
  const diary = document.getElementById('page-diary');
  const diaryPosts = document.getElementById('diary-posts');
  const firstSlide = document.querySelector('.slide');
  const allSlides = document.querySelectorAll('.slide');

  let selectedItem;
  let selectBg;
  let selectHref;
  let title;
  let imgOverlay = false;
  let slideCount = 0;

  // URL Parameter to variable
  const getParameterByName = (name, url) => {
    if (!url) {
      const currentURL = window.location.href;
      const target = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${target}(=([^&#]*)|&|#|$)`),
        results = regex.exec(currentURL);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    return null;
  };

  let activeYear = () => {
    let currentSlide = document.querySelector('.current');
    let currentSlideDate = currentSlide.querySelector('.slide-content').getAttribute('data-date');
    let currentYear = currentSlideDate.slice(-2);
    let currentYearNav = document.getElementById('year');
    currentYearNav.innerHTML = currentYear;
    let yearSelect = document.querySelector('.year-select');
    let diaryNavLinks = document.querySelectorAll('.diary-nav-link ');
    for (let i = 0; i < diaryNavLinks.length; i++) {
      diaryNavLinks[i].classList.remove('active-year');
    }
    yearSelect.querySelector(`.year-${currentYear}`).classList.add('active-year');
  };

  let diaryNavToggle = () => {
    const diaryNavToggleBtn = document.querySelector('.diary-nav-toggle');
    const diaryNavcontainer = document.querySelector('.diary-nav-container');
    const yearSelect = document.querySelector('.year-select');
    diaryNavToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      diaryNavcontainer.classList.add('on');
    });
    yearSelect.addEventListener('click', function(e) {
      e.preventDefault();
      diaryNavcontainer.classList.remove('on');
    });
  }

  let goToYear = () => {
    let diaryNavLink = document.querySelectorAll('.diary-nav-link');
    const diaryNavcontainer = document.querySelector('.diary-nav-container');
    for (let i = 0; i < diaryNavLink.length; i++) {
      diaryNavLink[i].addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        let clickedYear = e.srcElement.innerHTML.slice(-2);
        let correspondingYearElm = document.querySelector(`.year-date-${clickedYear}`);
        let currentSlide = document.querySelector('.current');

        for (let i = 0; i < allSlides.length; i++) {
          allSlides[i].classList.remove('active', 'current');
        }
        slideCount = 0;
        correspondingYearElm.parentNode.classList.add('active', 'current');
        // diaryNavcontainer.classList.remove('on');
        let currentSlideDate = correspondingYearElm.getAttribute('data-date');
        pushDate(currentSlideDate);

        let img = correspondingYearElm.querySelector('img');
        let dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
        }
        diaryNavcontainer.classList.remove('on');
        activeYear();
      });
    }
  }

  let pushDate = (date) => {
    let stateObj = { title: "post" };
    history.pushState(stateObj, "Diary Post", "?date=" + date);
  }

  // Diary
  let triggerNextSlide = (direction) => {
    // hide last slide description
    let cursorFollow = document.querySelectorAll('.cursor-follow');
    let currentSlide = document.querySelector('.current');
    let nextSlide = currentSlide.nextElementSibling;
    let previousSlide = currentSlide.previousElementSibling;
    let firstSlide = document.querySelector('.slide');
    var lastSlide = diaryPosts.lastElementChild;
    let currentSlideCursor = currentSlide.querySelector('.cursor-follow');


    // hide description on click
    currentSlideCursor.classList.remove('active');

    // go to previous slide
    if (direction == 'back'){
      if (previousSlide === null) {
        // go to end
        for (let i = 0; i < allSlides.length; i++) {
          allSlides[i].classList.remove('active');
        }
        slideCount = 0;
        // update url with last slide date
        let lastSlideDate = lastSlide.querySelector('.slide-content').getAttribute('data-date');
        pushDate(lastSlideDate);
        let img = lastSlide.querySelector('img');
        let dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
        }
        currentSlide.classList.remove('current', 'active');
        lastSlide.classList.add('active', 'current');
        activeYear();
      } else {
        let previousSlideDate = previousSlide.querySelector('.slide-content').getAttribute('data-date');
        pushDate(previousSlideDate);
        let img = previousSlide.querySelector('img');
        let dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
        }
        currentSlide.classList.remove('current', 'active');
        previousSlide.classList.add('active', 'current');
        activeYear();
      }
    } else {
      if (nextSlide === null) {
        // start at beginning
        for (let i = 0; i < allSlides.length; i++) {
          allSlides[i].classList.remove('active');
        }
        slideCount = 0;
        // update url with first slide date
        let firstSlideDate = firstSlide.querySelector('.slide-content').getAttribute('data-date');
        pushDate(firstSlideDate);
        let img = firstSlide.querySelector('img');
        let dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
        }
        currentSlide.classList.remove('current');
        firstSlide.classList.add('active', 'current');
        activeYear();
      } else {
        let nextSlideDate = nextSlide.querySelector('.slide-content').getAttribute('data-date');
        pushDate(nextSlideDate);
        let img = nextSlide.querySelector('img');
        let dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
        }
        // clear old slides
        if (slideCount < 3) {
          slideCount ++;
        } else {
          currentSlide.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('active');
        }
        currentSlide.classList.remove('current');
        nextSlide.classList.add('active', 'current');
        activeYear();
        // preload next image
        if (nextSlide.nextElementSibling){
          let nextImg = nextSlide.nextElementSibling.querySelector('img');
          let nextDataSrc = nextImg.getAttribute('data-src');
          if (nextDataSrc) {
            nextImg.src = nextDataSrc;
          }
        }
      }
    }
  }

  let arrowNav = () => {
    document.onkeydown = (e) => {
      e = e || window.event;
      switch(e.which || e.keyCode) {
        case 37: triggerNextSlide('back'); // left
        break;

        case 39: triggerNextSlide('forward'); // right
        break;

        default: return; // exit this handler for other keys
      }
    }
  }

  // diary starting place
  let diaryStartingPlace = () => {
    // if url has date
    let entryDate = getParameterByName('date');
    if (entryDate){
      let startDate = document.querySelector(`[data-date='${entryDate}']`);
      let startDateImg = startDate.querySelector('img');
      let startDateDataSrc = startDateImg.getAttribute('data-src');
      if (startDateDataSrc) {
        startDateImg.src = startDateDataSrc;
      }
      startDate.parentNode.classList.add('active', 'current');
      activeYear();
    } else {
      // FIRST SLIDE
      let firstSlideImg = firstSlide.querySelector('img');
      let firstSlideDataSrc = firstSlideImg.getAttribute('data-src');
      if (firstSlideDataSrc) {
        firstSlideImg.src = firstSlideDataSrc;
        let nextImg = firstSlide.nextElementSibling.querySelector('img');
        let nextDataSrc = nextImg.getAttribute('data-src');
        if (nextDataSrc) {
          nextImg.src = nextDataSrc;
        }
      }
      firstSlide.classList.add('active', 'current');
      activeYear();
    }
  }

  let diarySetUp = () => {
    for (let i = 0; i < allSlides.length; i++) {
      let slideYear = allSlides[i].querySelector('.slide-content').getAttribute('data-date').slice(-2);
      allSlides[i].querySelector('.slide-content').classList.add(`year-date-${slideYear}`);
      // click on next slide
      allSlides[i].addEventListener('click', function(e) {
        triggerNextSlide();
      });
    }
  }

  // close overlay
  const closeOverlay = () => {
    while (overlayContainer.firstChild) {
      overlayContainer.removeChild(overlayContainer.firstChild);
      overlay.classList.remove('active-overlay');
    }
    imgOverlay = false;
  };

  let lastKnownScrollPosition = 0;
  let ticking = false;
  const scrollFadeOut = document.querySelector('.scroll-fade-out');
  let newOpacity;
  let opacityNumber;

  function fadeOutDescription(scrollPos, el) {
    if (homePage || diary) {
      newOpacity = 1 - (scrollPos * 0.003);
      opacityNumber = Math.max(newOpacity.toFixed(2), 0);
      scrollFadeOut.setAttribute('style', `opacity: ${opacityNumber};`);
    }
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
        fadeOutDescription(lastKnownScrollPosition);
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
        overlay.classList.add('active-overlay');
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
        body.classList.add('screen-transitioning');
        portfolioTransition.classList.add('active');
        transitionalBgImg.setAttribute('style', `background-image: url(${selectBg});`);
        const link = document.createElement('link');
        link.href = selectHref;
        link.rel = 'dns-prefetch';

        document.getElementsByTagName('head')[0].appendChild(link);
        window.setTimeout(() => { window.location = selectHref; }, 1400);
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
        body.classList.add('screen-transitioning');
        portfolioTransition.classList.add('active');
        transitionalBgImg.setAttribute('style',
          `background-image: url(${preloadTransitionImage});`
        );
        window.setTimeout(() => { window.location = selectHref; }, 2200);
      }, false);
    });
  };

  const aboutPageTransition = (aboutEl) => {
    Array.prototype.forEach.call(aboutLink, (el, i) => {
      aboutEl[i].addEventListener('click', (e) => {
        e.preventDefault();
        selectHref = el.getAttribute('href');
        body.classList.add('screen-transitioning');
        portfolioTransition.classList.add('active');
        portfolioTransition.setAttribute('style', 'background: #cccccc');
        transitionalBgImg.setAttribute('style', 'background-image: url(/img/worldsgame/19.jpg);');
        window.setTimeout(() => { window.location = selectHref; }, 2200);
      }, false);
    });
  };

  // homepage cursor follow
  const hoverDtl = (hoverObj) => {
    Array.prototype.forEach.call(hoverObj, (el, i) => {

      hoverObj[i].addEventListener('mouseover', () => {
        const activeCursor = el.querySelector('.cursor-follow');
        activeCursor.classList.add('active');
      });

      hoverObj[i].addEventListener('mouseout', () => {
        const activeCursor = el.querySelector('.cursor-follow');
        activeCursor.classList.remove('active');
      });
    });
  };



  const portfolioSectionHover = () => {
    if (homePage) {
      Array.prototype.forEach.call(portfolioSection, (el, i) => {
        portfolioSection[i].addEventListener('mouseover', () => {
          const activeCursor = el.querySelector('.cursor-follow');
          activeCursor.classList.add('active');
        });
        portfolioSection[i].addEventListener('mouseout', () => {
          const activeCursor = el.querySelector('.cursor-follow');
          activeCursor.classList.remove('active');
        });
      });
    }
  };

  document.addEventListener('mousemove', (e) => {
    if (homePage || diary) {
      const activePortfolioHover = document.querySelectorAll('.cursor-follow.active');
      Array.prototype.forEach.call(activePortfolioHover, (el) => {
        el.setAttribute('style', `left: ${e.pageX}px; top: ${e.pageY}px;`);
      });
    }

  });




  // current page
  const checkCurrentPage = () => {
    if (currentPage !== 'diary' && currentPage !== 'home') {
      const activeNav = document.querySelector(`.nav-${currentPage}`);
      activeNav.classList.add('current');
    }

    if (currentPage === 'home') {
      const target = getParameterByName('to');
      if (target) {
        customIntro.innerHTML = `Hi, ${target}`;
      }
    }
    if (currentPage === 'diary') {

      // let firstSlideImg = firstSlide.querySelector('img');
      // let firstSlideDataSrc = firstSlideImg.getAttribute('data-src');
      // let entryDate;
      // let year = firstSlideDataSrc.slice(-6,-4)
      // activeYear(year);
      diarySetUp();
      diaryStartingPlace();
      hoverDtl(slide);
      arrowNav();
      diaryNavToggle();
      goToYear();
    }
  };

  aboutPageTransition(aboutLink);
  portfolioNavTransition(navLink);
  homePortfolioTransition(portfolioLink);
  portfolioItemSelect(portfolioItem);
  portfolioSectionHover();
  checkCurrentPage();
})();
