/* main.js
  1) Install modules from npm: $ npm install jquery --save
  2) Import from node_modules folder: import $ from 'jquery'
  3) Import your own compnents: import component from './path/to/component'
*/
// import inView from 'in-view';

(() => {
  const diaryPostDate = [ '02-27-17', '02-23-17' ]

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

  let selectedItem;
  let selectBg;
  let selectHref;
  let title;
  let imgOverlay = false;

  // Diary Posts
  if (currentPage == 'diary') {
    let slideNumber = 0;
    let nextSlideUrl;
    let nextSlide = () => {
      if (slideNumber < diaryPostDate.length) {
        let nextSlideUrl = `/diary/${diaryPostDate[slideNumber]}.html`;
        slideNumber ++;
        return nextSlideUrl;
      } else {
        slideNumber = 0;
        let nextSlideUrl = `/diary/${diaryPostDate[0]}.html`;
        slideNumber ++;
        return nextSlideUrl;
      }
    };

    diaryPosts.addEventListener('click', () => {
      request.open('Get', nextSlide());
      request.send();
    });

    // create new post
    let createPost = (content) => {
      let newcontent = document.createElement('div');
      newcontent.className = 'slides';
      newcontent.innerHTML = content;
      // newcontent.onmouseover = showDetails;
      // newcontent.onmouseout = hideDetails;
      diaryPosts.appendChild(newcontent);
    };

    // set up a request
    var request = new XMLHttpRequest();


    var showDetails = () => {
      let slideContent = document.querySelectorAll('.slide-content');
      console.log(slideContent[0]);
      let slideDate = slideContent[0].getAttribute('data-date');
      let slideTitle = slideContent[0].getAttribute('data-title');
      currentSlideTitle.innerHTML = `<span>${slideTitle}</span><br> ${slideDate}`;
      currentSlideTitle.classList.add('active');
    };

    var hideDetails = () => {
      // console.log('out');
      currentSlideTitle.classList.remove('active');
    };

    // keep track of the request
    request.onreadystatechange = function() {
      // check if the response data send back to us
      if(request.readyState === 4) {
        if(request.status === 200) {
          // update the HTML of the element
          createPost(request.responseText);
        } else {
          // otherwise display an error message
          diaryPosts.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        }
      }
    }

    // make initial request
    request.open('Get', nextSlide());
    request.send();

    // Array.prototype.forEach.call(slideContent, (el, i) => {
    //   slideContent[i].addEventListener('mouseover', () => {
    //     let slideDate = slideContent[i].getAttribute('data-date');
    //     let slideTitle = slideContent[i].getAttribute('data-title');
    //     currentSlideTitle.innerHTML = `<span>${slideTitle}</span><br> ${slideDate}`;
    //     currentSlideTitle.classList.add('active');
    //   });
    //   slideContent[i].addEventListener('mouseout', () => {
    //     currentSlideTitle.classList.remove('active');
    //   });
    // });
  };

  // const showDetails = (i) => {
  //   console.log('details');
  //   let slideDate = slideContent[i].getAttribute('data-date');
  //   let slideTitle = slideContent[i].getAttribute('data-title');
  //   currentSlideTitle.innerHTML = `<span>${slideTitle}</span><br> ${slideDate}`;
  //   currentSlideTitle.classList.add('active');
  // };

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
  const description = document.querySelector('.description');

  let newOpacity;
  let opacityNumber;

  function fadeOutDescription(scrollPos) {
    if (homePage) {
      newOpacity = 1 - (scrollPos * 0.003);
      opacityNumber = Math.max(newOpacity.toFixed(2), 0);
      description.setAttribute('style', `opacity: ${opacityNumber};`);
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

  // current page nav
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
  };

  aboutPageTransition(aboutLink);
  portfolioNavTransition(navLink);
  homePortfolioTransition(portfolioLink);
  portfolioItemSelect(portfolioItem);
  portfolioSectionHover();
  checkCurrentPage();
})();
