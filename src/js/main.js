import { openMenu } from './modules/menu.js';
import mapboxgl from '../../node_modules/mapbox-gl/dist/mapbox-gl';
import Swiper from 'swiper/bundle';
import { Fancybox } from '@fancyapps/ui';

document.addEventListener('DOMContentLoaded', function (event) {
  openMenu();

  mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FuZWtsaXMiLCJhIjoiY2tqc2g2bWk1M3pyODJ6bG9jNTlicG1qbSJ9.kAq6U0hW3k2xL5j7paZWcg';

  if (document.querySelector('#map')) {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [158.0056858370474, 54.6124094160279], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });

    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('a');
      el.className = 'marker';
      el.setAttribute('href', feature.link);
      el.addEventListener('click', () => {
        console.log(feature.link);
        // window.location.href = toString(el.features.type);
      });

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }
  }

  // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout
  const breakpoint = window.matchMedia('(min-width:768px)');

  // keep track of swiper instances to destroy later
  let newsSlider;
  let alphabethSlider;

  const breakpointChecker = function () {
    // if larger viewport and multi-row layout needed
    if (breakpoint.matches === true) {
      // clean up old instances and inline styles when available
      if (newsSlider !== undefined) newsSlider.destroy(true, true);

      if (alphabethSlider !== undefined) alphabethSlider.destroy(true, true);

      // or/and do nothing
      return;

      // else if a small viewport and single column layout needed
    } else if (breakpoint.matches === false) {
      // fire small viewport version of swiper
      return enableSwiper();
    }
  };

  const enableSwiper = function () {
    const newsSlider = new Swiper('.news__slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
      },
      navigation: {
        prevEl: '.swiper-prev-btn',
        nextEl: '.swiper-next-btn',
      },
    });

    const alphabethSlider = new Swiper('.museums__filter-list', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      freeMode: true,
      navigation: {
        prevEl: '.museums__filter-prev-btn',
        nextEl: '.museums__filter-next-btn',
      },
    });
  };

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();

  const textpageSlider = new Swiper('.textpage__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-next-btn',
      prevEl: '.swiper-prev-btn',
    },
    paginationClickable: true,
    breakpoints: {
      768: {
        slidesPerView: 1.7,
        spaceBetween: 40,
        cssWidthAndHeight: true,
        autoResize: false,
        loop: true,
      },
    },
  });

  const mainItemSlider = new Swiper('.main-item__items-slider', {
    slidesPerView: 1.5,
    spaceBetween: 40,
    navigation: {
      nextEl: '.main-item__items-slider-next-btn',
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  });

  const newsFilterSlider = new Swiper('.news__slider-filter', {
    slidesPerView: 4,
    spaceBetween: 20,
    freeMode: true,
    navigation: {
      nextEl: '.news__slider-filter-next-btn',
      prevEl: '.news__slider-filter-prev-btn',
    },
  });

  const textpageMainSlider = new Swiper('.textpage__main-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.textpage__main-slider-next-btn',
      prevEl: '.textpage__main-slider-prev-btn',
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },
  });

  /* Search Bar */
  const searchInput = document.querySelector('#search');

  if (searchInput) {
    searchInput.addEventListener('keyup', function (e) {
      // UI Element
      let namesLI = document.getElementsByClassName('museums__list-item-title');

      // Get Search Query
      let searchQuery = document.querySelector('#search').value.toLowerCase();

      // Search Compare & Display
      for (let index = 0; index < namesLI.length; index++) {
        const name = namesLI[index].textContent.toLowerCase();

        if (name.includes(searchQuery)) {
          namesLI[index].parentNode.parentNode.style.display = 'block';
        } else {
          namesLI[index].parentNode.parentNode.style.display = 'none';
        }
      }
    });
  }

  const filters = document.querySelectorAll('.filter');

  filters.forEach((filter) => {
    filter.addEventListener('click', function () {
      let selectedFilter = filter.getAttribute('data-filter').toLowerCase();

      let itemsToHide = document.querySelectorAll(
        `.filter-list .filter-item:not([data-filter='${selectedFilter}'])`
      );
      let itemsToShow = document.querySelectorAll(
        `.filter-list [data-filter='${selectedFilter}']`
      );

      if (selectedFilter == 'all') {
        itemsToHide = [];
        itemsToShow = document.querySelectorAll('.filter-list [data-filter]');
      }

      itemsToHide.forEach((el) => {
        el.style.display = 'none';
      });

      itemsToShow.forEach((el) => {
        el.style.display = 'block';
      });
    });
  });

  const copyLinkBtn = document.querySelector('.copylink__btn');

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      document.querySelector('.copylink__text').classList.add('is-active');
      setTimeout(() => {
        document
          .querySelectorAll('.copylink__text')
          .forEach((el) => el.remove());
      }, 3000);
    });
  }
});
