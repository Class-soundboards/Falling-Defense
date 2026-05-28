
if (window.top !== window.self) {
    window.top.location.replace(window.self.location.href);
}


const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {

            if (node.tagName === 'IFRAME' || node.tagName === 'SCRIPT' || node.tagName === 'IMG') {
                const src = node.src || node.getAttribute('src');
                if (src) {
                    try {
                        const url = new URL(src, window.location.href);
                        if (url.hostname !== window.location.hostname) {
                            node.remove();
                        }
                    } catch (e) {
                        
                    }
                }
            }
        });
    });
});

// Start watching the document for external elements immediately
observer.observe(document.documentElement, { childList: true, subtree: true });
