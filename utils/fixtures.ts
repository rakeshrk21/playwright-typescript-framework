import { expect, test as base } from '@playwright/test';
import { RequestHandler } from './request-handler';
import { config } from "../config/api-test.config";

type ApiFixtures = {
  apiClient: RequestHandler,
  config: typeof config
};

const test = base.extend<ApiFixtures>({

  apiClient: async ({ request, config }, use) => {

    const requestHandler = new RequestHandler(request, config.API_URL);
    await use(requestHandler);

    console.log('===Teardown===');
  },

  config: async({}, use) => {
    await use(config);
  }

});

export { expect, test };
