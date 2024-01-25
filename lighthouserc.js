// https://github.com/GoogleChrome/lighthouse/blob/v5.5.0/lighthouse-core/config/default-config.js#L362

module.exports = {
  ci: {
    collect: {
      url: 'http://localhost:3000',
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'ready on',
    },
    assert: {
      // preset: 'lighthouse:no-pwa',
      // preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.75 }],
        'robots-txt': 'warn',
        canonical: 'warn',
        'document-title': 'warn',
        'meta-description': 'warn',
        'structured-data': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
