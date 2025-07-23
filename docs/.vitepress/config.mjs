import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Tinker Documentation',
    description: 'Documentation for the Tinker project',
    
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' }
      ],
      
      sidebar: [
        {
          text: 'Documentation',
          items: [
            { text: 'Home', link: '/' },
            { text: 'Event Storming', link: '/1_event_storming' },
            { text: 'User Journeys', link: '/2_user_journeys' },
            { text: 'Touch Points & Screens', link: '/3_touch_points_screens' },
            { text: 'Screen Mockups', link: '/4_screen_mockups' },
            { text: 'Screen Variations', link: '/5_screen_variations' },
            { text: 'Summary', link: '/6_summary' },
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

