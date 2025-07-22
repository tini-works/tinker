document.addEventListener("DOMContentLoaded", function() {
  // Initialize mermaid with custom settings
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true
    },
    fontFamily: 'Roboto, sans-serif'
  });
});

