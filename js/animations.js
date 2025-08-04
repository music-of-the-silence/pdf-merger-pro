// animations.js - jQuery animations for PDF Merger Pro

$(document).ready(function() {
    // Navbar animations
    animateNavbar();
    
    // Add hover effects to navbar links
    setupNavLinkHoverEffects();
    
    // Animate theme and language toggles
    setupToggleAnimations();
    
    // Page-specific animations
    animatePageContent();
});

/**
 * Animate navbar elements on page load
 */
function animateNavbar() {
    // Removed logo animation
    
    // Animate nav links with slide and fade
    $('.nav-link').each(function(index) {
        $(this).css('opacity', 0);
        $(this).delay(100 * index).animate({
            opacity: 1,
            top: 0
        }, 500);
    });
    
    // Animate controls with fade in
    $('.nav-controls > div').each(function(index) {
        $(this).css('opacity', 0);
        $(this).delay(500 + (100 * index)).animate({
            opacity: 1
        }, 500);
    });
}

/**
 * Setup enhanced hover effects for navbar links
 */
function setupNavLinkHoverEffects() {
    $('.nav-link').hover(
        function() {
            // Mouse enter
            $(this).stop(true, false).animate({
                backgroundColor: 'rgba(79, 70, 229, 0.15)',
                paddingLeft: '20px',
                paddingRight: '20px'
            }, 300, 'easeOutQuart');
            
            // Add a custom underline animation
            $(this).find('.nav-link-underline').stop(true, false).animate({
                width: '100%',
                opacity: 1
            }, 400, 'easeOutElastic');
            
            // No elevation effect - removed the translateY transformation
        },
        function() {
            // Mouse leave
            $(this).stop(true, false).animate({
                backgroundColor: 'rgba(79, 70, 229, 0)',
                paddingLeft: '16px',
                paddingRight: '16px'
            }, 300, 'easeInOutQuad');
            
            // Hide underline on mouse leave (unless active)
            if (!$(this).hasClass('active')) {
                $(this).find('.nav-link-underline').stop(true, false).animate({
                    width: '0%',
                    opacity: 0
                }, 300, 'easeInQuad');
            }
            
            // Keep active state for current page
            if ($(this).hasClass('active')) {
                $(this).css('backgroundColor', 'rgba(79, 70, 229, 0.1)');
            }
        }
    );
    
    // Add underline elements to each nav link
    $('.nav-link').each(function() {
        if ($(this).find('.nav-link-underline').length === 0) {
            $(this).append('<span class="nav-link-underline"></span>');
            
            // Initialize underlines - visible for active links, hidden for others
            if ($(this).hasClass('active')) {
                $(this).find('.nav-link-underline').css({
                    width: '80%',
                    opacity: 1
                });}
            } else {
                $(this).find('.nav-link-underline').css({
                    width: '0%',
                    opacity: 0
                });
            }
        }
    });
    // Initialize underlines - visible for active links, hidden for others
    $('.nav-link').each(function() {
        if ($(this).find('.nav-link-underline').length === 0) {
            $(this).append('<span class="nav-link-underline"></span>');
            
            if ($(this).hasClass('active')) {
                $(this).find('.nav-link-underline').css({
                    width: '80%',
                    opacity: 1
                });
            } else {
                $(this).find('.nav-link-underline').css({
                    width: '0%',
                    opacity: 0
                });
            }
        }
    });
}

/**
 * Setup animations for theme and language toggles
 */
function setupToggleAnimations() {
    // Theme toggle hover animation
    $('.theme-toggle').hover(
        function() {
            $(this).stop(true, false).animate({
                boxShadow: '0 0 15px rgba(79, 70, 229, 0.6)'
            }, 300);
            $(this).css('transform', 'rotate(15deg) scale(1.1)');
        },
        function() {
            $(this).stop(true, false).animate({
                boxShadow: '0 0 0 rgba(79, 70, 229, 0)'
            }, 300);
            $(this).css('transform', 'rotate(0deg) scale(1)');
        }
    );
    
    // Theme toggle click animation
    $('.theme-toggle').click(function() {
        $(this).effect('pulsate', { times: 1 }, 300);
        $(this).css('transform', 'scale(0.9)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 300);
    });
    
    // Language toggle hover animation
    $('.language-toggle').hover(
        function() {
            $(this).stop(true, false).animate({
                boxShadow: '0 0 15px rgba(79, 70, 229, 0.6)'
            }, 300);
            $(this).css('transform', 'rotate(15deg) scale(1.1)');
        },
        function() {
            $(this).stop(true, false).animate({
                boxShadow: '0 0 0 rgba(79, 70, 229, 0)'
            }, 300);
            $(this).css('transform', 'rotate(0deg) scale(1)');
        }
    );
    
    // Language toggle click animation
    $('.language-toggle').click(function(e) {
        // Don't prevent the default behavior or stop propagation
        // Just add the visual animation
        $(this).effect('pulsate', { times: 1 }, 300);
        $(this).css('transform', 'scale(0.9)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 300);
    });
}

/**
 * Animate page content based on current page
 */
function animatePageContent() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Common animations for all pages
    $('h1, h2').each(function(index) {
        $(this).css('opacity', 0);
        $(this).delay(300 * index).animate({
            opacity: 1,
            left: 0
        }, 800);
    });
    
    // Page-specific animations
    switch(currentPage) {
        case 'index.html':
        case '':
            animateHomePage();
            break;
        case 'features.html':
            animateFeaturesPage();
            break;
        case 'help.html':
            animateHelpPage();
            break;
        case 'about.html':
            animateAboutPage();
            break;
    }
}

/**
 * Animate home page elements
 */
function animateHomePage() {
    // Animate file upload area
    $('#fileUploadArea').css('opacity', 0);
    $('#fileUploadArea').delay(500).animate({
        opacity: 1
    }, 800);
    
    // Animate buttons with bounce effect
    $('.btn-primary, .btn-secondary').each(function(index) {
        $(this).css('opacity', 0);
        $(this).delay(800 + (200 * index)).animate({
            opacity: 1
        }, 500, function() {
            $(this).effect('bounce', { times: 1, distance: 10 }, 300);
        });
    });
}

/**
 * Animate features page elements
 */
function animateFeaturesPage() {
    // Animate feature cards
    $('.feature-card').each(function(index) {
        $(this).css({
            opacity: 0,
            transform: 'translateY(50px)'
        });
        $(this).delay(200 * index).animate({
            opacity: 1
        }, 800, function() {
            $(this).css('transform', 'translateY(0)');
        });
    });
}

/**
 * Animate help page elements
 */
function animateHelpPage() {
    // No specific animations for FAQ items as requested.
    // They will be displayed by default based on CSS.
}

/**
 * Animate about page elements
 */
function animateAboutPage() {
    // Animate team members
    $('.team-member').each(function(index) {
        $(this).css({
            opacity: 0,
            transform: 'scale(0.8)'
        });
        $(this).delay(200 * index).animate({
            opacity: 1
        }, 800, function() {
            $(this).css('transform', 'scale(1)');
        });
    });
    
    // Animate timeline items
    $('.timeline-item').each(function(index) {
        $(this).css('opacity', 0);
        $(this).delay(300 * index).animate({
            opacity: 1,
            left: 0
        }, 800);
    });
}