import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Same-origin; the client infers baseURL from window.location in the browser.
});

export const { signIn, signUp, signOut, useSession } = authClient;
