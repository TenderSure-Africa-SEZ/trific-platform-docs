import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Trific Platform Documentation',
  description: 'A curated marketplace connecting clients with pre-vetted service providers',
  
  base: '/trific-platform-docs/', // Repository name
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Architecture', link: '/architecture/' }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started/' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Installation', link: '/getting-started/installation' }
          ]
        }
      ],
      
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'System Architecture', link: '/architecture/system-overview' },
            { text: 'Data Models', link: '/architecture/data-models' },
            { text: 'Security', link: '/architecture/security' }
          ]
        }
      ],
      
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Providers', link: '/api/providers' },
            { text: 'Contracts', link: '/api/contracts' },
            { text: 'Payments', link: '/api/payments' },
            { text: 'Messaging', link: '/api/messaging' }
          ]
        }
      ],
      
      '/portals/': [
        {
          text: 'Portal Documentation',
          items: [
            { text: 'Overview', link: '/portals/' },
            { text: 'Client Portal', link: '/portals/client-portal' },
            { text: 'Provider Portal', link: '/portals/provider-portal' },
            { text: 'Admin Portal', link: '/portals/admin-portal' },
            { text: 'Management Portal', link: '/portals/management-portal' }
          ]
        }
      ],
      
      '/workflows/': [
        {
          text: 'Workflows',
          items: [
            { text: 'Overview', link: '/workflows/' },
            { text: 'Client Journey', link: '/workflows/client-journey' },
            { text: 'Provider Onboarding', link: '/workflows/provider-onboarding' },
            { text: 'Vetting Process', link: '/workflows/vetting-process' },
            { text: 'Payment Flow', link: '/workflows/payment-flow' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TenderSure-Africa-SEZ/trific-platform-docs' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Trific Platform'
    }
  },

  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true
  }
})