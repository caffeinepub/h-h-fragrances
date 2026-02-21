// Smooth scroll utility using native browser APIs
// No external dependencies required

export function initSmoothScroll() {
    // Enable smooth scrolling via CSS
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup function
    return () => {
        document.documentElement.style.scrollBehavior = 'auto';
    };
}
