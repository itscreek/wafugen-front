import packageJson from './package.json' assert { type: 'json' };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['alarms'],
  host_permissions: [
    'https://www.youtube.com/*'
  ],
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['https://www.youtube.com/*'],
      js: ['src/pages/content/index.js'],
      run_at: 'document_end'
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'icon-128.png', 'icon-34.png', 'src/pages/tsuriScoreUi/index.js', 'src/pages/tsuriReportUi/index.js'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
