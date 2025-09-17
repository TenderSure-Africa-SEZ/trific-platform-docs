import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Trific Platform Docs',
  description: 'A curated marketplace connecting clients with pre-vetted service providers',
  
  base: '/trific-platform-docs/', // Repository name
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/getting-started/' },
      { text: 'Platform', link: '/platform/' },
      { text: 'Portals', link: '/portals/' },
      { text: 'API', link: '/api/' },
      { 
        text: 'Resources', 
        items: [
          { text: 'Workflows', link: '/workflows/' },
          { text: 'Integrations', link: '/integrations/' },
          { text: 'Guides', link: '/guides/' },
          { text: 'Technical', link: '/technical/' }
        ]
      },
      { 
        text: 'More', 
        items: [
          { text: 'Reference', link: '/reference/' },
          { text: 'Support', link: '/support/' }
        ]
      }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started/' },
            { text: 'Quick Start (5 min)', link: '/getting-started/quick-start' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'First Steps', link: '/getting-started/first-steps' },
            { text: 'Troubleshooting', link: '/getting-started/troubleshooting' }
          ]
        }
      ],

      '/platform/': [
        {
          text: 'Platform',
          items: [
            { text: 'Overview', link: '/platform/' },
            { text: 'Architecture', link: '/platform/architecture' },
            { text: 'User Roles', link: '/platform/user-roles' },
            { text: 'Business Model', link: '/platform/business-model' },
            { text: 'Security', link: '/platform/security' }
          ]
        }
      ],

      '/portals/': [
        {
          text: 'Portal Overview',
          items: [
            { text: 'All Portals', link: '/portals/' }
          ]
        },
                {
          text: 'Home/Landing Portal',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/portals/home-landing/' },
            {
              text: 'Content Management',
              collapsed: true,
              items: [
                { text: 'Storyblok CMS', link: '/portals/home-landing/content-management/' },
                { text: 'Dynamic Content', link: '/portals/home-landing/content-management/dynamic-content' },
                { text: 'SEO Optimization', link: '/portals/home-landing/content-management/seo-optimization' },
                { text: 'Multilingual Support', link: '/portals/home-landing/content-management/multilingual' }
              ]
            },
            {
              text: 'Provider Directory',
              collapsed: true,
              items: [
                { text: 'Public Listings', link: '/portals/home-landing/provider-directory/' },
                { text: 'Search & Filters', link: '/portals/home-landing/provider-directory/search-filters' },
                { text: 'Provider Profiles', link: '/portals/home-landing/provider-directory/provider-profiles' },
                { text: 'Ratings & Reviews', link: '/portals/home-landing/provider-directory/ratings-reviews' }
              ]
            },
            {
              text: 'User Registration',
              collapsed: true,
              items: [
                { text: 'Registration Flow', link: '/portals/home-landing/user-registration/' },
                { text: 'Client Signup', link: '/portals/home-landing/user-registration/client-signup' },
                { text: 'Provider Signup', link: '/portals/home-landing/user-registration/provider-signup' },
                { text: 'Email Verification', link: '/portals/home-landing/user-registration/email-verification' }
              ]
            },
            {
              text: 'Content Pages',
              collapsed: true,
              items: [
                { text: 'About Pages', link: '/portals/home-landing/content-pages/about-pages' },
                { text: 'Service Categories', link: '/portals/home-landing/content-pages/service-categories' },
                { text: 'Help Center', link: '/portals/home-landing/content-pages/help-center' },
                { text: 'Legal Pages', link: '/portals/home-landing/content-pages/legal-pages' }
              ]
            },
            {
              text: 'SEO Features',
              collapsed: true,
              items: [
                { text: 'Meta Management', link: '/portals/home-landing/seo-features/meta-management' },
                { text: 'Structured Data', link: '/portals/home-landing/seo-features/structured-data' },
                { text: 'Sitemap Generation', link: '/portals/home-landing/seo-features/sitemap-generation' },
                { text: 'Analytics Integration', link: '/portals/home-landing/seo-features/analytics-integration' }
              ]
            },
            {
              text: 'Performance',
              collapsed: true,
              items: [
                { text: 'Caching Strategy', link: '/portals/home-landing/performance/caching-strategy' },
                { text: 'Image Optimization', link: '/portals/home-landing/performance/image-optimization' },
                { text: 'Core Web Vitals', link: '/portals/home-landing/performance/core-web-vitals' },
                { text: 'CDN Configuration', link: '/portals/home-landing/performance/cdn-configuration' }
              ]
            }
          ]
        },
        {
          text: 'Client Portal',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/portals/client/' },
            { text: 'Getting Started', link: '/portals/client/getting-started' },
            {
              text: 'Dashboard',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/portals/client/dashboard/overview' },
                { text: 'Notifications', link: '/portals/client/dashboard/notifications' },
                { text: 'Analytics', link: '/portals/client/dashboard/analytics' }
              ]
            },
            {
              text: 'Provider Discovery',
              collapsed: true,
              items: [
                { text: 'Search & Browse', link: '/portals/client/provider-discovery/search-browse' },
                { text: 'Filtering', link: '/portals/client/provider-discovery/filtering' },
                { text: 'Provider Profiles', link: '/portals/client/provider-discovery/provider-profiles' },
                { text: 'Shortlisting', link: '/portals/client/provider-discovery/shortlisting' }
              ]
            },
            {
              text: 'Job Management',
              collapsed: true,
              items: [
                { text: 'Create Jobs', link: '/portals/client/job-management/create-jobs' },
                { text: 'Manage Jobs', link: '/portals/client/job-management/manage-jobs' },
                { text: 'Job Templates', link: '/portals/client/job-management/job-templates' },
                { text: 'Applicant Review', link: '/portals/client/job-management/applicant-review' }
              ]
            },
            {
              text: 'Contract Management',
              collapsed: true,
              items: [
                { text: 'Creating Contracts', link: '/portals/client/contract-management/creating-contracts' },
                { text: 'Contract Templates', link: '/portals/client/contract-management/contract-templates' },
                { text: 'Milestone Setup', link: '/portals/client/contract-management/milestone-setup' },
                { text: 'Document Management', link: '/portals/client/contract-management/document-management' },
                { text: 'Contract Tracking', link: '/portals/client/contract-management/contract-tracking' }
              ]
            },
            {
              text: 'Payments',
              collapsed: true,
              items: [
                { text: 'Escrow Deposits', link: '/portals/client/payments/escrow-deposits' },
                { text: 'Milestone Approval', link: '/portals/client/payments/milestone-approval' },
                { text: 'Payment Methods', link: '/portals/client/payments/payment-methods' },
                { text: 'Transaction History', link: '/portals/client/payments/transaction-history' },
                { text: 'Refunds & Disputes', link: '/portals/client/payments/refunds-disputes' }
              ]
            },
            {
              text: 'Messaging',
              collapsed: true,
              items: [
                { text: 'Secure Communication', link: '/portals/client/messaging/secure-communication' },
                { text: 'File Sharing', link: '/portals/client/messaging/file-sharing' },
                { text: 'Message History', link: '/portals/client/messaging/message-history' },
                { text: 'Communication Threads', link: '/portals/client/messaging/communication-threads' }
              ]
            },
            {
              text: 'Reviews & Ratings',
              collapsed: true,
              items: [
                { text: 'Provider Feedback', link: '/portals/client/reviews-ratings/provider-feedback' },
                { text: 'Review Management', link: '/portals/client/reviews-ratings/review-management' },
                { text: 'Feedback Analytics', link: '/portals/client/reviews-ratings/feedback-analytics' }
              ]
            },
            {
              text: 'User Management',
              collapsed: true,
              items: [
                { text: 'Team Accounts', link: '/portals/client/user-management/team-accounts' },
                { text: 'Role Permissions', link: '/portals/client/user-management/role-permissions' },
                { text: 'Profile Management', link: '/portals/client/user-management/profile-management' },
                { text: 'Account Settings', link: '/portals/client/user-management/account-settings' }
              ]
            }
          ]
        },
        {
          text: 'Provider Portal',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/portals/provider/' },
            {
              text: 'Onboarding',
              collapsed: true,
              items: [
                { text: 'Registration', link: '/portals/provider/onboarding/registration' },
                { text: 'KYC/KYB', link: '/portals/provider/onboarding/kyc-kyb' },
                { text: 'Document Upload', link: '/portals/provider/onboarding/document-upload' },
                { text: 'Questionnaire', link: '/portals/provider/onboarding/questionnaire' },
                { text: 'Vetting Fee', link: '/portals/provider/onboarding/vetting-fee' }
              ]
            },
            {
              text: 'Vetting Process',
              collapsed: true,
              items: [
                { text: 'TenderSure Integration', link: '/portals/provider/vetting-process/tendersure-integration' },
                { text: 'Evaluation Criteria', link: '/portals/provider/vetting-process/evaluation-criteria' },
                { text: 'Scoring System', link: '/portals/provider/vetting-process/scoring-system' },
                { text: 'Status Tracking', link: '/portals/provider/vetting-process/status-tracking' },
                { text: 'Re-evaluation', link: '/portals/provider/vetting-process/re-evaluation' }
              ]
            },
            {
              text: 'Profile Management',
              collapsed: true,
              items: [
                { text: 'Business Profile', link: '/portals/provider/profile-management/business-profile' },
                { text: 'Portfolio Showcase', link: '/portals/provider/profile-management/portfolio-showcase' },
                { text: 'Skills & Categories', link: '/portals/provider/profile-management/skills-categories' },
                { text: 'Certifications', link: '/portals/provider/profile-management/certifications' },
                { text: 'Rate Cards', link: '/portals/provider/profile-management/rate-cards' }
              ]
            },
            {
              text: 'Job Board',
              collapsed: true,
              items: [
                { text: 'Available Jobs', link: '/portals/provider/job-board/available-jobs' },
                { text: 'Job Applications', link: '/portals/provider/job-board/job-applications' },
                { text: 'Job Alerts', link: '/portals/provider/job-board/job-alerts' },
                { text: 'Filtering Jobs', link: '/portals/provider/job-board/filtering-jobs' },
                { text: 'Application Tracking', link: '/portals/provider/job-board/application-tracking' }
              ]
            },
            {
              text: 'Contract Management',
              collapsed: true,
              items: [
                { text: 'Direct Invitations', link: '/portals/provider/contract-management/direct-invitations' },
                { text: 'Contract Acceptance', link: '/portals/provider/contract-management/contract-acceptance' },
                { text: 'Milestone Tracking', link: '/portals/provider/contract-management/milestone-tracking' },
                { text: 'Work Submission', link: '/portals/provider/contract-management/work-submission' },
                { text: 'Contract Completion', link: '/portals/provider/contract-management/contract-completion' }
              ]
            },
            {
              text: 'Earnings & Payments',
              collapsed: true,
              items: [
                { text: 'Dashboard', link: '/portals/provider/earnings-payments/dashboard' },
                { text: 'Payment Tracking', link: '/portals/provider/earnings-payments/payment-tracking' },
                { text: 'Withdrawal Methods', link: '/portals/provider/earnings-payments/withdrawal-methods' },
                { text: 'Transaction History', link: '/portals/provider/earnings-payments/transaction-history' },
                { text: 'Tax Reporting', link: '/portals/provider/earnings-payments/tax-reporting' }
              ]
            },
            {
              text: 'Performance',
              collapsed: true,
              items: [
                { text: 'Ratings & Reviews', link: '/portals/provider/performance/ratings-reviews' },
                { text: 'Completion Rates', link: '/portals/provider/performance/completion-rates' },
                { text: 'Quality Scores', link: '/portals/provider/performance/quality-scores' },
                { text: 'Improvement Tips', link: '/portals/provider/performance/improvement-tips' }
              ]
            }
          ]
        },
        {
          text: 'Admin Portal (TenderSure)',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/portals/admin/' },
            {
              text: 'Dashboard',
              items: [
                { text: 'Overview', link: '/portals/admin/dashboard/overview' },
                { text: 'Verification Queue', link: '/portals/admin/dashboard/verification-queue' },
                { text: 'System Alerts', link: '/portals/admin/dashboard/system-alerts' },
                { text: 'Activity Logs', link: '/portals/admin/dashboard/activity-logs' }
              ]
            },
            {
              text: 'Provider Management',
              items: [
                { text: 'Vetting Workflow', link: '/portals/admin/provider-management/vetting-workflow' },
                { text: 'Scoring Engine', link: '/portals/admin/provider-management/scoring-engine' },
                { text: 'Approval/Rejection', link: '/portals/admin/provider-management/approval-rejection' },
                { text: 'Blacklist Management', link: '/portals/admin/provider-management/blacklist-management' },
                { text: 'Bulk Operations', link: '/portals/admin/provider-management/bulk-operations' }
              ]
            },
            {
              text: 'Service Management',
              items: [
                { text: 'Category Management', link: '/portals/admin/service-management/category-management' },
                { text: 'Evaluation Criteria', link: '/portals/admin/service-management/evaluation-criteria' },
                { text: 'Scoring Updates', link: '/portals/admin/service-management/scoring-updates' },
                { text: 'Quality Standards', link: '/portals/admin/service-management/quality-standards' }
              ]
            }
          ]
        },
        {
          text: 'Management Portal (Trific)',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/portals/management/' },
            {
              text: 'Dashboard',
              items: [
                { text: 'Executive Overview', link: '/portals/management/dashboard/executive-overview' },
                { text: 'Financial Summary', link: '/portals/management/dashboard/financial-summary' },
                { text: 'User Growth', link: '/portals/management/dashboard/user-growth' },
                { text: 'Operational Metrics', link: '/portals/management/dashboard/operational-metrics' }
              ]
            },
            {
              text: 'Client Management',
              items: [
                { text: 'Client Onboarding', link: '/portals/management/client-management/client-onboarding' },
                { text: 'Account Oversight', link: '/portals/management/client-management/account-oversight' },
                { text: 'Credit Limits', link: '/portals/management/client-management/credit-limits' },
                { text: 'Client Analytics', link: '/portals/management/client-management/client-analytics' }
              ]
            },
            {
              text: 'Financial Operations',
              items: [
                { text: 'Escrow Management', link: '/portals/management/financial-operations/escrow-management' },
                { text: 'Payment Processing', link: '/portals/management/financial-operations/payment-processing' },
                { text: 'Revenue Tracking', link: '/portals/management/financial-operations/revenue-tracking' },
                { text: 'Fraud Prevention', link: '/portals/management/financial-operations/fraud-prevention' }
              ]
            }
          ]
        }
      ],
      
      '/api/': [
        {
          text: 'API Documentation',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Rate Limiting', link: '/api/rate-limiting' }
          ]
        },
        {
          text: 'Core Endpoints',
          items: [
            { text: 'Providers', link: '/api/endpoints/providers' },
            { text: 'Clients', link: '/api/endpoints/clients' },
            { text: 'Jobs', link: '/api/endpoints/jobs' },
            { text: 'Contracts', link: '/api/endpoints/contracts' },
            { text: 'Payments', link: '/api/endpoints/payments' },
            { text: 'Messaging', link: '/api/endpoints/messaging' },
            { text: 'Vetting', link: '/api/endpoints/vetting' },
            { text: 'Categories', link: '/api/endpoints/categories' },
            { text: 'Reviews', link: '/api/endpoints/reviews' },
            { text: 'Notifications', link: '/api/endpoints/notifications' }
          ]
        },
        {
          text: 'Webhooks',
          items: [
            { text: 'Overview', link: '/api/webhooks/overview' },
            { text: 'Payment Events', link: '/api/webhooks/payment-events' },
            { text: 'Contract Events', link: '/api/webhooks/contract-events' },
            { text: 'User Events', link: '/api/webhooks/user-events' },
            { text: 'Webhook Security', link: '/api/webhooks/webhook-security' }
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'SDKs', link: '/api/sdks' },
            { text: 'Examples', link: '/api/examples' },
            { text: 'Testing', link: '/api/testing' },
            { text: 'Migration Guides', link: '/api/migration-guides' }
          ]
        }
      ],

      '/workflows/': [
        {
          text: 'Workflows Overview',
          items: [
            { text: 'All Workflows', link: '/workflows/' }
          ]
        },
        {
          text: 'Client Journey',
          items: [
            { text: 'Registration to First Hire', link: '/workflows/client-journey/registration-to-first-hire' },
            { text: 'Job Posting Workflow', link: '/workflows/client-journey/job-posting-workflow' },
            { text: 'Direct Hire Process', link: '/workflows/client-journey/direct-hire-process' },
            { text: 'Payment Milestone Flow', link: '/workflows/client-journey/payment-milestone-flow' },
            { text: 'Dispute Resolution Flow', link: '/workflows/client-journey/dispute-resolution-flow' }
          ]
        },
        {
          text: 'Provider Onboarding',
          items: [
            { text: 'Registration to Approval', link: '/workflows/provider-onboarding/registration-to-approval' },
            { text: 'KYC/KYB Verification', link: '/workflows/provider-onboarding/kyc-kyb-verification' },
            { text: 'TenderSure Vetting', link: '/workflows/provider-onboarding/tendersure-vetting' },
            { text: 'Profile Completion', link: '/workflows/provider-onboarding/profile-completion' },
            { text: 'First Project Acquisition', link: '/workflows/provider-onboarding/first-project-acquisition' }
          ]
        },
        {
          text: 'Vetting Process',
          items: [
            { text: 'Admin Evaluation Workflow', link: '/workflows/vetting-process/admin-evaluation-workflow' },
            { text: 'Scoring Methodology', link: '/workflows/vetting-process/scoring-methodology' },
            { text: 'Approval/Rejection Process', link: '/workflows/vetting-process/approval-rejection-process' },
            { text: 'Quarterly Re-evaluation', link: '/workflows/vetting-process/quarterly-re-evaluation' },
            { text: 'Blacklist Management', link: '/workflows/vetting-process/blacklist-management' }
          ]
        },
        {
          text: 'Payment & Escrow Flow',
          items: [
            { text: 'Deposit to Escrow', link: '/workflows/payment-escrow-flow/deposit-to-escrow' },
            { text: 'Milestone Approval', link: '/workflows/payment-escrow-flow/milestone-approval' },
            { text: 'Fund Release', link: '/workflows/payment-escrow-flow/fund-release' },
            { text: 'Dispute Handling', link: '/workflows/payment-escrow-flow/dispute-handling' },
            { text: 'Refund Process', link: '/workflows/payment-escrow-flow/refund-process' }
          ]
        },
        {
          text: 'Job Lifecycle',
          items: [
            { text: 'Job Creation to Posting', link: '/workflows/job-lifecycle/job-creation-to-posting' },
            { text: 'Provider Application Process', link: '/workflows/job-lifecycle/provider-application-process' },
            { text: 'Client Selection Process', link: '/workflows/job-lifecycle/client-selection-process' },
            { text: 'Contract Execution', link: '/workflows/job-lifecycle/contract-execution' },
            { text: 'Project Completion', link: '/workflows/job-lifecycle/project-completion' }
          ]
        },
        {
          text: 'Communication Flows',
          items: [
            { text: 'Messaging System', link: '/workflows/communication-flows/messaging-system' },
            { text: 'Notification Delivery', link: '/workflows/communication-flows/notification-delivery' },
            { text: 'File Sharing', link: '/workflows/communication-flows/file-sharing' },
            { text: 'Audit Trail', link: '/workflows/communication-flows/audit-trail' }
          ]
        }
      ],

      '/integrations/': [
        {
          text: 'Integrations Overview',
          items: [
            { text: 'All Integrations', link: '/integrations/' }
          ]
        },
        {
          text: 'Core Integrations',
          items: [
            { text: 'TenderSure', link: '/integrations/tendersure/' },
            { text: 'Payment Gateways', link: '/integrations/payment-gateways/' },
            { text: 'Messaging', link: '/integrations/messaging/' },
            { text: 'CMS Content', link: '/integrations/cms-content/' }
          ]
        },
        {
          text: 'Analytics & Monitoring',
          items: [
            { text: 'Analytics', link: '/integrations/analytics/' },
            { text: 'Notification Services', link: '/integrations/notification-services/' }
          ]
        }
      ],

      '/technical/': [
        {
          text: 'Technical Documentation',
          items: [
            { text: 'Overview', link: '/technical/' }
          ]
        },
        {
          text: 'Architecture',
          items: [
            { text: 'System Overview', link: '/technical/architecture/system-overview' },
            { text: 'Data Models', link: '/technical/architecture/data-models' },
            { text: 'Microservices', link: '/technical/architecture/microservices' },
            { text: 'Security Architecture', link: '/technical/architecture/security-architecture' }
          ]
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Overview', link: '/deployment/' },
            { text: 'Development', link: '/deployment/development' },
            { text: 'Staging', link: '/deployment/staging' },
            { text: 'Production', link: '/deployment/production' }
          ]
        },
        {
          text: 'Database',
          items: [
            { text: 'Schema', link: '/technical/database/schema' },
            { text: 'Migrations', link: '/technical/database/migrations' },
            { text: 'Performance', link: '/technical/database/performance' }
          ]
        },
        {
          text: 'Monitoring',
          items: [
            { text: 'Logging', link: '/technical/monitoring/logging' },
            { text: 'Metrics', link: '/technical/monitoring/metrics' },
            { text: 'Alerting', link: '/technical/monitoring/alerting' }
          ]
        }
      ],

      '/guides/': [
        {
          text: 'Guides Overview',
          items: [
            { text: 'All Guides', link: '/guides/' }
          ]
        },
        {
          text: 'User Guides',
          items: [
            { text: 'Client Handbook', link: '/guides/user-guides/client-handbook' },
            { text: 'Provider Handbook', link: '/guides/user-guides/provider-handbook' },
            { text: 'Admin Handbook', link: '/guides/user-guides/admin-handbook' }
          ]
        },
        {
          text: 'Development',
          items: [
            { text: 'Coding Standards', link: '/guides/development/coding-standards' },
            { text: 'Testing Guide', link: '/guides/development/testing-guide' },
            { text: 'Contribution Guide', link: '/guides/development/contribution-guide' },
            { text: 'Release Process', link: '/guides/development/release-process' }
          ]
        },
        {
          text: 'Tutorials',
          items: [
            { text: 'First Contract', link: '/guides/tutorials/first-contract' },
            { text: 'Setting up Payments', link: '/guides/tutorials/setting-up-payments' },
            { text: 'Custom Integrations', link: '/guides/tutorials/custom-integrations' }
          ]
        }
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Overview', link: '/reference/' },
            { text: 'Glossary', link: '/reference/glossary' },
            { text: 'Error Codes', link: '/reference/error-codes' },
            { text: 'Changelog', link: '/reference/changelog' }
          ]
        },
        {
          text: 'Migration Guides',
          items: [
            { text: 'Overview', link: '/reference/migration-guides/' }
          ]
        }
      ],

      '/support/': [
        {
          text: 'Support',
          items: [
            { text: 'Overview', link: '/support/' },
            { text: 'FAQ', link: '/support/faq' },
            { text: 'Troubleshooting', link: '/support/troubleshooting' },
            { text: 'Contact', link: '/support/contact' },
            { text: 'Community', link: '/support/community' }
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
    },

    search: {
      provider: 'local'
    }
  },

  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,
    config: (md) => {
      // Add mermaid support
      // This would require additional mermaid plugin configuration
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/trific-platform-docs/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ]
})