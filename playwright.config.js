import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 5,
  // reporter: 'html',
  reporter: [["line"], ["allure-playwright"]],

  use: {
    baseURL: 'https://demoqa.com',
    screenshot: 'only-on-failure', 
    // Записывать видео: 'off', 'on', 'retain-on-failure', 'on-first-retry'
    video: 'retain-on-failure',
    trace: 'retain-on-failure', 
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

