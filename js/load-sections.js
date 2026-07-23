document.addEventListener("DOMContentLoaded", function () {
    const sectionsContainer = document.getElementById("main-content-sections");

    if (!sectionsContainer) {
        console.error("Could not find the #main-content-sections element. Please add this div to your HTML file.");
        return;
    }

    fetch('sections.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load sections.html");
            }
            return response.text();
        })
        .then(html => {
            sectionsContainer.innerHTML = html;
        })
        .catch(error => {
            console.error("Failed to load the sections:", error);
            sectionsContainer.innerHTML = "<p style='text-align: center; color: red;'>Failed to load the content. Please check and try again.</p>";
        });
});