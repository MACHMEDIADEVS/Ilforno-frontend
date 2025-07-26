document.addEventListener('DOMContentLoaded', () => {
    const loadHtmlComponent = async (elementId, filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;

            // Para el header, activamos el enlace de la página actual
            if (elementId === 'header-placeholder') {
                const currentPath = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('#navbarNav .nav-link');
                navLinks.forEach(link => {
                    if (link.href.includes(currentPath) && currentPath !== '') {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    } else if (currentPath === '' && link.href.includes('index.html')) { // Para la homepage si se accede como dominio.com/
                         link.classList.add('active');
                         link.setAttribute('aria-current', 'page');
                    } else {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                    }
                });
            }

        } catch (error) {
            console.error(`Error loading component from ${filePath}:`, error);
        }
    };

    // Carga el header en el elemento con id 'header-placeholder'
    loadHtmlComponent('header-placeholder', 'components/header.html');

    // Carga el footer en el elemento con id 'footer-placeholder'
    loadHtmlComponent('footer-placeholder', 'components/footer.html');
});
