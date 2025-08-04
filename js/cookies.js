/**
 * Cookie Consent Banner and Management
 * Handles cookie consent and settings for PDF Merger Pro
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a cookie choice
    if (!getCookie('cookie_consent')) {
        showCookieBanner();
    }

    // Set up event listeners for cookie banner buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('#accept-cookies')) {
            setCookie('cookie_consent', 'accepted', 365);
            hideCookieBanner();
            // Set all cookie types as accepted
            setCookie('cookie_analytics', 'true', 365);
            setCookie('cookie_preferences', 'true', 365);
            initializeAnalytics();
        } 
        else if (e.target.matches('#reject-cookies')) {
            setCookie('cookie_consent', 'rejected', 30);
            hideCookieBanner();
            // Only set essential cookies
            setCookie('cookie_analytics', 'false', 30);
            setCookie('cookie_preferences', 'false', 30);
        }
        else if (e.target.matches('#cookie-settings-btn')) {
            document.getElementById('cookie-settings').classList.toggle('show');
        }
        else if (e.target.matches('#save-cookie-settings')) {
            saveCookiePreferences();
        }
    });

    // Close cookie settings when clicking outside
    document.addEventListener('click', function(e) {
        const settings = document.getElementById('cookie-settings');
        if (settings && !settings.contains(e.target) && !e.target.matches('#cookie-settings-btn')) {
            settings.classList.remove('show');
        }
    });

    // Initialize analytics if consent was given
    if (getCookie('cookie_consent') === 'accepted' && getCookie('cookie_analytics') === 'true') {
        initializeAnalytics();
    }
});

function showCookieBanner() {
    // Create cookie banner HTML
    const bannerHTML = `
        <div id="cookie-banner" class="cookie-banner">
            <div class="cookie-content">
                <div class="cookie-text">
                    <h3>We value your privacy</h3>
                    <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
                    <div class="cookie-links">
                        <a href="cookie-policy.html" class="cookie-link">Cookie Policy</a>
                        <a href="privacy-policy.html" class="cookie-link">Privacy Policy</a>
                    </div>
                </div>
                <div class="cookie-buttons">
                    <button id="reject-cookies" class="btn btn-outline">Reject All</button>
                    <button id="cookie-settings-btn" class="btn btn-outline">Settings</button>
                    <button id="accept-cookies" class="btn btn-primary">Accept All</button>
                </div>
            </div>
            <div id="cookie-settings" class="cookie-settings">
                <h4>Cookie Settings</h4>
                <div class="cookie-option">
                    <label class="cookie-switch">
                        <input type="checkbox" id="pref-analytics" checked>
                        <span class="slider round"></span>
                    </label>
                    <div class="cookie-option-text">
                        <strong>Analytics Cookies</strong>
                        <p>Allow us to analyze website usage to improve performance and user experience.</p>
                    </div>
                </div>
                <div class="cookie-option">
                    <label class="cookie-switch">
                        <input type="checkbox" id="pref-preferences" checked>
                        <span class="slider round"></span>
                    </label>
                    <div class="cookie-option-text">
                        <strong>Preference Cookies</strong>
                        <p>Remember your preferences like theme selection and language.</p>
                    </div>
                </div>
                <div class="cookie-settings-buttons">
                    <button id="save-cookie-settings" class="btn btn-primary">Save Settings</button>
                </div>
            </div>
        </div>
    `;

    // Add banner to the page
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => banner.remove(), 300);
    }
}

function saveCookiePreferences() {
    const analytics = document.getElementById('pref-analytics').checked;
    const preferences = document.getElementById('pref-preferences').checked;
    
    setCookie('cookie_analytics', analytics.toString(), 365);
    setCookie('cookie_preferences', preferences.toString(), 365);
    setCookie('cookie_consent', 'custom', 365);
    
    if (analytics) {
        initializeAnalytics();
    }
    
    document.getElementById('cookie-settings').classList.remove('show');
    hideCookieBanner();
}

function initializeAnalytics() {
    // Only initialize if not already initialized and consent is given
    if (window.gaInitialized || getCookie('cookie_analytics') !== 'true') return;
    
    // Initialize Google Analytics or other analytics tools here
    // Example:
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'YOUR-GA-TRACKING-ID');
    
    window.gaInitialized = true;
}

// Helper function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

// Helper function to get a cookie value
function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
