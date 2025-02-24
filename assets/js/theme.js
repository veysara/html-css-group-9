"use strict";
const d = document;
d.addEventListener("DOMContentLoaded", function(event) {

    // Plceholder
    var preloader = d.querySelector('.loading-preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('d-none');
        }, 1000);
    }

    // Headroom
    if (d.querySelector('.headroom')) {
        var headroom = new Headroom(document.querySelector(".main-header"), {
            offset: 100, // Adjusted offset
            tolerance: {
                up: 0,
                down: 0
            },
        });
        headroom.init();
    }

    // Tooltips
    var ToolTipTrigger = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = ToolTipTrigger.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Popovers
    var PopoverTrigger = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = PopoverTrigger.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    // Swiper
    var sliderSelector = '.swiper-container',
        defaultOptions = {
            breakpointsInverse: true,
            observer: true
        };

    var nSlider = document.querySelectorAll(sliderSelector);

    [].forEach.call(nSlider, function(slider, index, arr) {
        var data = slider.getAttribute('data-swiper-options') || {};

        if (data) {
            var dataOptions = JSON.parse(data);
        }

        slider.options = Object.assign({}, defaultOptions, dataOptions);

        var swiper = new Swiper(slider, slider.options);

        if (typeof slider.options.autoplay !== 'undefined' && slider.options.autoplay !== false) {
            slider.addEventListener('mouseenter', function(e) {
                swiper.autoplay.stop();
            });

            slider.addEventListener('mouseleave', function(e) {
                swiper.autoplay.start();
            });
        }
    });

    // Glowing text effect
    const textElement = document.querySelector('.welcome');
    const glowDuration = 200; // Duration of the glow effect
    let isGlowing = false;

    function glowEffect() {
        if (!isGlowing) {
            textElement.classList.add('glow'); // Add glow class
            isGlowing = true;
            setTimeout(glowEffect, glowDuration); // Wait for the glow duration
        } else {
            textElement.classList.remove('glow'); // Remove glow class
            isGlowing = false;
            setTimeout(glowEffect, glowDuration); // Wait for the glow duration
        }
    }

    // Start the glow effect
    glowEffect();

    // Event listeners for background image change
    const banner = document.getElementById('banner');
    const roomBtns = ['guestRoomBtn', 'kitchenBtn', 'officeBtn', 'loungeBtn'];
    const images = {
        guestRoom: "assets/img/livingroom.jpg",
        kitchen: "assets/img/kitchen.jpg",
        office: "assets/img/office.jpg",
        lounge: "assets/img/lounge.jpg",
    };

    roomBtns.forEach(btnId => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('mouseenter', () => {
                const room = btnId.split('Btn')[0].toLowerCase();
                banner.style.backgroundImage = `url('${images[room]}')`;
            });
            button.addEventListener('mouseleave', () => {
                banner.style.backgroundImage = "url('assets/img/home-banner-2.jpg')";
            });
        }
    });

    // Smooth scroll for sections
    ['livingRoomBtn', 'kitchenBtn', 'officeBtn', 'loungeBtn'].forEach(btnId => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const target = document.getElementById(btnId.split('Btn')[0].toLowerCase());
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Filter items based on category
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const items = document.querySelectorAll('.item');
            items.forEach(item => {
                item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
            });
        });
    });

    // General function for loading content based on category
    function loadContent(category) {
        const contentRow = document.getElementById('content-row');
        const path = `./${category}.html`;
        fetch(path)
            .then(response => response.text())
            .then(html => {
                contentRow.innerHTML = html;
            })
            .catch(error => {
                console.error(`Error loading ${category}.html:`, error);
                contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
            });
    }

    // Add to Cart functionality
    const cartCountElement = document.getElementById('cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartCount() {
        cartCountElement.textContent = cartItems.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            cartItems.push({ name: productName, price: productPrice });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            alert(`${productName} has been added to your cart!`);
        });
    });

    updateCartCount();

});
document.getElementById('buy-now-btn').addEventListener('click', function() {
  window.location.href = 'https://t.me/DavidYonqwp'; // Redirect to Telegram link
});

function bed() {
  // Path to the HTML file for Bed content
  const bedHtmlPath = './bed.html';
  const contentRow = document.getElementById('content-row');

  // Fetch the content of bed.html and replace the row
  fetch(bedHtmlPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load bed.html');
      }
      return response.text();
    })
    .then(html => {
      contentRow.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading bed.html:', error);
      contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
    });
}

function chair() {
  // Path to the HTML file for Bed content
  const bedHtmlPath = './chair.html';
  const contentRow = document.getElementById('content-row');

  // Fetch the content of bed.html and replace the row
  fetch(bedHtmlPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load bed.html');
      }
      return response.text();
    })
    .then(html => {
      contentRow.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading bed.html:', error);
      contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
    });
}

function table() {
  // Path to the HTML file for Bed content
  const bedHtmlPath = './table.html';
  const contentRow = document.getElementById('content-row');

  // Fetch the content of bed.html and replace the row
  fetch(bedHtmlPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load bed.html');
      }
      return response.text();
    })
    .then(html => {
      contentRow.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading bed.html:', error);
      contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
    });
}

function sofa() {
  // Path to the HTML file for Bed content
  const bedHtmlPath = './sofa.html';
  const contentRow = document.getElementById('content-row');

  // Fetch the content of bed.html and replace the row
  fetch(bedHtmlPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load bed.html');
      }
      return response.text();
    })
    .then(html => {
      contentRow.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading bed.html:', error);
      contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
    });
}

function workart() {
  // Path to the HTML file for Bed content
  const bedHtmlPath = './workart.html';
  const contentRow = document.getElementById('content-row');

  // Fetch the content of bed.html and replace the row
  fetch(bedHtmlPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load bed.html');
      }
      return response.text();
    })
    .then(html => {
      contentRow.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading bed.html:', error);
      contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
    });
}

function allproduct() {
  // Path to the HTML file for Bed content
  const bedHtmlPath = './allproduct.html';
  const contentRow = document.getElementById('content-row');

  // Fetch the content of bed.html and replace the row
  fetch(bedHtmlPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load bed.html');
      }
      return response.text();
    })
    .then(html => {
      contentRow.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading bed.html:', error);
      contentRow.innerHTML = '<p class="text-danger">Error loading content. Please try again.</p>';
    });
}