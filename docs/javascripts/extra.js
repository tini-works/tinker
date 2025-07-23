document$.subscribe(() => {
  mermaid.initialize({
    startOnLoad: false,
    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true
    },
    sequence: {
      useMaxWidth: true
    },
    gantt: {
      useMaxWidth: true
    },
    class: {
      useMaxWidth: true
    },
    state: {
      useMaxWidth: true
    },
    pie: {
      useMaxWidth: true
    },
    fontFamily: 'Roboto, sans-serif'
  });
  
  // Re-render mermaid diagrams when page content changes
  mermaid.init(undefined, document.querySelectorAll(".mermaid"));
});
