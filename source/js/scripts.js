(function($, window, document) {


}(window.jQuery, window, document));




window.onload = function(){
  var homePage = document.querySelector('.home-page');
  var portfolioImg = document.querySelectorAll('.portfolio-page .portfolio img');
  var portfolioVid = document.querySelectorAll('.portfolio-page .portfolio video');
  var portfolioItem = document.querySelectorAll('.portfolio-item');
  var overlay = document.querySelector('.overlay');
  var overlayContainer = document.querySelector('.overlay-container');
  var activeOverlay = document.querySelectorAll('.overlay.active');
  var imgTitle = document.querySelector('.img-title');
  var title;
  var imgOverlay = false;
  var portfolioSection = document.querySelectorAll(".portfolio-section");

  window.addEventListener('scroll', function(){
    // close overlay on scroll
    if(imgOverlay === true){
      closeOverlay();
    }
  });

  // close overlay on click
  if(overlay){
    overlay.addEventListener('click', function (e) {
      closeOverlay();
    }, false);
  }

  // close overlay
  closeOverlay = function(){
    while (overlayContainer.firstChild) {
        overlayContainer.removeChild(overlayContainer.firstChild);
        removeClass(overlay, 'active-overlay');
    }
    imgOverlay = false;
  };

  // clone image, open overlay insert name
  portfolioItemSelect = function(selectedPortfolioItem){
    Array.prototype.forEach.call(selectedPortfolioItem, function (el, i){
      selectedPortfolioItem[i].addEventListener('click', function () {
        var clone = el.cloneNode();
        overlayContainer.appendChild(clone);
        addClass(overlay, 'active-overlay');
        title = el.getAttribute('title');
        imgTitle.innerHTML = title;
        imgOverlay = true;
      }, false);
    });
  };

  // homepage cursor follow
  portfolioSectionHover = function(){
    if(homePage){
      Array.prototype.forEach.call(portfolioSection, function(el, i){
        portfolioSection[i].addEventListener('mouseover', function() {
          var activeCursor = el.querySelector('.cursor-follow');
          addClass(activeCursor, 'active');
        });
        portfolioSection[i].addEventListener('mouseout', function() {
          var activeCursor = el.querySelector('.cursor-follow');
          removeClass(activeCursor, 'active');
        });
      });
    }
  };

  document.addEventListener('mousemove', function(e){
    if(homePage){
      var activePortfolioHover = document.querySelectorAll(".cursor-follow.active");
      Array.prototype.forEach.call(activePortfolioHover, function(el, i){
        el.setAttribute('style', 'left:' + e.pageX + 'px;' + 'top:' + e.pageY + 'px;');
      });
    }
  });

  // current page nav
  function currentPage(){
    var body = document.querySelector('body');
    var currentPage = body.getAttribute('data-page');

    if(currentPage !== 'home'){
      var activeNav = document.querySelector('.nav-' + currentPage);
      addClass(activeNav,'current');
    }
    if (currentPage == 'about') {
      var name = getParameterByName('to');
      console.log(name);
    }
  }

  // customize about page to someone
  getParameterByName = function (name, url) {
      if (!url) {
       url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
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

  // helpers
  addClass = function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += " " + className;
    }
  };

  removeClass = function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className += " " + className;
    }
  };




  portfolioItemSelect(portfolioItem);
  portfolioSectionHover();
  currentPage();
};
