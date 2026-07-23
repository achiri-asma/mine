document.addEventListener("DOMContentLoaded", async function () {
    // 1. Load Header & Footer
    await loadComponent("header-placeholder", "components/header.html", true);
    await loadComponent("footer-placeholder", "components/footer.html", false);

    // 2. Load content sections if the corresponding placeholders exist.
    const sections = ['about', 'skills', 'projects', 'experience', 'blog', 'contact'];
    
    // Load all sections in parallel using Promise.all.
    await Promise.all(sections.map(section => 
        loadComponent(`${section}-placeholder`, `components/sections/${section}.html`, false)
    ));

    // 3. Reinitialize the application logic after the HTML has been inserted into the DOM.
    if (window.initScrollAnimations) {
        window.initScrollAnimations(); 
    }
    if (window.initParallax) {
        window.initParallax();
    }
    
    // Reinitialize GitHub Stars if the logic exists (defined in scripts.js).
    if (window.fetchGitHubStars) {
        window.fetchGitHubStars();
    }
});

async function loadComponent(elementId, filePath, isHeader) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Handle relative paths for subdirectories (e.g., if the page is located in /blog/).
    const isSubFolder = window.location.pathname.includes("/blog/") || window.location.pathname.includes("/projects/");
    const fetchPath = isSubFolder ? "../" + filePath : filePath;

    try {
        const response = await fetch(fetchPath);
        if (response.ok) {
            let html = await response.text();
            
            // Fix image/link paths when in a subdirectory.
            if (isSubFolder) {
                html = html.replace(/href="(?!(http|#|mailto|\.\.))([^"]*)"/g, 'href="../$2"');
                html = html.replace(/src="(?!(http|\.\.))([^"]*)"/g, 'src="../$2"');
            }

            element.innerHTML = html;

            if (isHeader) {
                if (window.highlightActiveMenu) window.highlightActiveMenu();
                if (window.initThemeToggle) window.initThemeToggle();
            }
            
            if (!isHeader && elementId === 'footer-placeholder') {
                const yearSpan = document.getElementById('currentYear');
                if(yearSpan) yearSpan.textContent = new Date().getFullYear();
            }
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}