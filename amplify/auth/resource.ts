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
          clientId: '0oahln0iwgFaVZwJW1d7',
          clientSecret: 'kikAigxnjLFHmUYCF_zFLCax2tjOpW2HT3opGvKWKDYpfLdlTTCmusDiK7CstfVi',
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
