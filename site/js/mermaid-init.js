// Custom Mermaid initialization for GitBook theme compatibility
document.addEventListener('DOMContentLoaded', function() {
    // Wait for mermaid to be available
    if (typeof mermaid !== 'undefined') {
        console.log('Mermaid is available, initializing...');
        
        // Initialize mermaid with configuration
        mermaid.initialize({
            securityLevel: 'loose',
            theme: 'default',
            startOnLoad: true,
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            },
            journey: {
                useMaxWidth: true
            },
            sequence: {
                useMaxWidth: true
            },
            class: {
                useMaxWidth: true
            },
            state: {
                useMaxWidth: true
            }
        });
        
        // Force re-render of any mermaid diagrams
        setTimeout(function() {
            const mermaidDivs = document.querySelectorAll('.mermaid');
            console.log('Found ' + mermaidDivs.length + ' mermaid diagrams');
            
            if (mermaidDivs.length > 0) {
                mermaid.init(undefined, mermaidDivs);
            }
        }, 100);
    } else {
        console.log('Mermaid not available yet, retrying...');
        // Retry after a short delay
        setTimeout(arguments.callee, 100);
    }
});
