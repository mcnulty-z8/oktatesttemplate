//amplify/auth/resource.ts

import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: 'Okta',
          clientId: secret('OKTA_CLIENT_ID'),
          clientSecret: secret('OKTA_CLIENT_SECRET'),
          issuerUrl: 'https://simpletech.oktapreview.com', // Correct Okta domain
        },
      ],
      logoutUrls: [
        'http://localhost:5173/', 
        'https://main.dpgverupq1lfn.amplifyapp.com/'
      ],
      callbackUrls: [
        'http://localhost:5173/profile',
        'https://main.dpgverupq1lfn.amplifyapp.com/profile',
      ],
    },
  },
});