document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieOverlay = document.getElementById('cookieConsentOverlay');
    const acceptButton = document.getElementById('acceptCookies');
    const denyButton = document.getElementById('denyCookies');

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function showConsentDialog() {
        cookieOverlay.classList.remove('hidden');
        cookieOverlay.classList.add('visible');
        cookieConsent.classList.remove('hidden');
        cookieConsent.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function hideConsentDialog() {
        cookieOverlay.classList.remove('visible');
        cookieOverlay.classList.add('hidden');
        cookieConsent.classList.remove('visible');
        cookieConsent.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (!getCookie('cookieConsent')) {
        showConsentDialog();
    } else if (getCookie('cookieConsent') === 'accepted') {
        // Only start GA if consent was previously accepted
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
        gtag('js', new Date());
        gtag('config', 'G-49FKR4VRLD');
    }

    acceptButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'accepted', 365);
        hideConsentDialog();
        
        // Enable and initialize Google Analytics
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
        gtag('js', new Date());
        gtag('config', 'G-49FKR4VRLD');
    });

    denyButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'declined', 365);
        hideConsentDialog();
        // No need to update gtag consent since GA won't be initialized
    });
});
