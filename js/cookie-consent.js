document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookies');
    const declineButton = document.getElementById('declineCookies');

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

    if (!getCookie('cookieConsent')) {
        cookieConsent.classList.remove('hidden');
    }

    acceptButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'accepted', 365);
        cookieConsent.classList.add('hidden');
        // Enable Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    });

    declineButton.addEventListener('click', () => {
        setCookie('cookieConsent', 'declined', 365);
        cookieConsent.classList.add('hidden');
        // Disable Google Analytics
        window['ga-disable-G-49FKR4VRLD'] = true;
    });
});
