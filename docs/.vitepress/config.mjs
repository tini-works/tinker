import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Tinker Documentation',
    description: 'Documentation for the Tinker invoice approval system',
    base: '/tinker/',
    
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Implementation', link: '/database-implementation' },
        { text: 'Architecture', link: '/technical-architecture' }
      ],
      
      sidebar: [
        {
          text: 'Implementation Guides',
          items: [
            { text: 'Database Implementation', link: '/database-implementation' },
            { text: 'Technical Architecture', link: '/technical-architecture' },
            { text: 'Development Setup', link: '/development-setup' },
            { text: 'Business Processes & Error Codes', link: '/business-processes' }
          ]
        },
        {
          text: 'Domain Analysis',
          items: [
            { text: 'Event Storming', link: '/1_event_storming' },
            { text: 'User Journeys', link: '/2_user_journeys' },
            { text: 'Touch Points & Screens', link: '/3_touch_points_screens' },
            { text: 'Screen Mockups', link: '/4_screen_mockups' },
            { text: 'Screen Variations', link: '/5_screen_variations' },
            { text: 'Summary', link: '/6_summary' }
          ]
        },
        {
          text: 'Examples & References',
          items: [
            { text: 'Mermaid Examples', link: '/mermaid_example' }
          ]
        }
      ]
    },
    
    // Mermaid configuration to match the original mkdocs setup
    mermaid: {
      securityLevel: 'loose',
      theme: 'default',
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
    }
  })
)
