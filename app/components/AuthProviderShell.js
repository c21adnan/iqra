"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

export const hasAuth0Config = Boolean(auth0Domain && auth0ClientId);

export default function AuthProviderShell({ children }) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!hasAuth0Config || !origin) {
    return children;
  }

  return (
    <Auth0Provider
      authorizationParams={{
        redirect_uri: `${origin}/dashboard/`,
      }}
      cacheLocation="localstorage"
      clientId={auth0ClientId}
      domain={auth0Domain}
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  );
}
