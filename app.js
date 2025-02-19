document.querySelector('a[href="#home"]').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default jump
  
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      window.scrollTo({
        top: heroSection.offsetTop, // Scroll to top of hero
        behavior: 'smooth'
      });
    }
  });
$(function () {
    let headerElem = $('header');
    let logo = $('#logo');
    let navMenu = $('#nav-menu');
    let navToggle = $('#nav-toggle');

   $('#properties-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev">previous</a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next">next</a>',
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
   });

   $('#testimonials-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><</a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next">></a>'
   });

   navToggle.on('click', () => {
       navMenu.css('right', '0');
   });

   $('#close-flyout').on('click', () => {
        navMenu.css('right', '-100%');
   });

   $(document).on('click', (e) => {
       let target = $(e.target);
       if (!(target.closest('#nav-toggle').length > 0 || target.closest('#nav-menu').length > 0)) {
           navMenu.css('right', '-100%');
       }
   });

   $(document).scroll(() => {
       let scrollTop = $(document).scrollTop();

       if (scrollTop > 0) {
           navMenu.addClass('is-sticky');
           logo.css('color', '#000');
           headerElem.css('background', '#fff');
           navToggle.css('border-color', '#000');
           navToggle.find('.strip').css('background-color', '#000');
       } else {
           navMenu.removeClass('is-sticky');
           logo.css('color', '#fff');
           headerElem.css('background', 'transparent');
           navToggle.css('bordre-color', '#fff');
           navToggle.find('.strip').css('background-color', '#fff');
       }

       headerElem.css(scrollTop >= 200 ? {'padding': '0.5rem', 'box-shadow': '0 -4px 10px 1px #999'} : {'padding': '1rem 0', 'box-shadow': 'none' });
   });

   $(document).trigger('scroll');
});

document.addEventListener('DOMContentLoaded', function() {
    // Properties Data
    const properties = [
        {
            image: 'img/property-1.jpg',
            title: 'Luxury Villa in Beverly Hills',
            price: '$5,900,000',
            beds: 5,
            baths: 6,
            sqft: 6500,
            address: '123 Beverly Hills Dr, Beverly Hills, CA'
        },
        {
            image: 'img/property-2.jpg',
            title: 'Modern Apartment in Downtown',
            price: '$1,200,000',
            beds: 2,
            baths: 2,
            sqft: 1200,
            address: '456 Downtown Ave, Los Angeles, CA'
        },
        {
            image: 'img/property-3.jpg',
            title: 'Beachfront Condo',
            price: '$2,500,000',
            beds: 3,
            baths: 3,
            sqft: 2000,
            address: '789 Ocean View Blvd, Malibu, CA'
        }
    ];

    // Load Properties
    const propertiesGrid = document.querySelector('.properties-grid');
    if (propertiesGrid) {
        loadProperties(propertiesGrid, properties);
    }

    // Search Functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProperties = properties.filter(property => 
                property.title.toLowerCase().includes(searchTerm) ||
                property.address.toLowerCase().includes(searchTerm)
            );
            loadProperties(propertiesGrid, filteredProperties);
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Helper Functions
function loadProperties(container, properties) {
    container.innerHTML = '';
    properties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        container.appendChild(propertyCard);
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <img src="${property.image}" alt="${property.title}">
        <div class="property-details">
            <h3>${property.title}</h3>
            <p class="price">${property.price}</p>
            <div class="property-features">
                <span>${property.beds} Beds</span>
                <span>${property.baths} Baths</span>
                <span>${property.sqft} Sq Ft</span>
            </div>
            <p class="address">${property.address}</p>
            <button class="view-details">View Details</button>
        </div>
    `;
    return card;
}