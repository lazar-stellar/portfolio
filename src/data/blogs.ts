export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      bullets?: string[];
      codeBlocks?: {
        label?: string;
        language: string;
        code: string;
      }[];
    }[];
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-i-structure-scalable-nestjs-applications",
    title: "How I Structure Scalable NestJS Applications",
    excerpt:
      "A practical look at how I organize modules, business logic, and APIs in NestJS projects that need to stay maintainable as they grow.",
    category: "NestJS",
    date: "April 2026",
    readingTime: "6 min read",
    seoTitle: "How I Structure Scalable NestJS Applications | Lazar Panović",
    seoDescription:
      "A practical guide to structuring scalable NestJS applications with clear modules, business logic, validation, and maintainable backend architecture.",
    content: {
      intro:
        "When a NestJS project is small, almost any structure can feel good enough. The real challenge starts when the application grows, business rules become more complex, and multiple modules begin to depend on each other. My goal is always to keep the structure simple enough to move fast, but clear enough to scale.",
      sections: [
        {
          heading: "Start with the domain, not the framework",
          paragraphs: [
            "I try not to structure backend code around technical folders alone. Instead of thinking first about controllers, services, and DTOs, I start from the business domains the application actually has.",
            "That usually leads to modules that represent real product concepts: invoices, users, reports, billing periods, or integrations. NestJS works especially well when modules match the language of the business.",
          ],
          bullets: [
            "One module should solve one clear business problem",
            "Shared code should stay minimal and intentional",
            "Cross-module dependencies should be explicit",
          ],
        },
        {
          heading: "Keep business logic out of controllers",
          paragraphs: [
            "Controllers should stay thin. Their job is to receive the request, validate input, and delegate to the service layer. Once controllers start containing conditionals, mapping, and domain rules, they become harder to maintain and test.",
            "I prefer services that are focused, readable, and close to the language of the product. That keeps the application easier to extend when requirements change.",
          ],
        },
        {
          heading: "Separate data access from orchestration",
          paragraphs: [
            "In larger applications, a service often does too much if it is responsible for both database access and workflow orchestration. A better pattern is to keep persistence logic predictable and let higher-level services coordinate the flow.",
            "This becomes especially useful in reporting, background jobs, or integrations where one use case touches multiple tables or external systems.",
          ],
          bullets: [
            "Repositories or query-oriented services for data access",
            "Application services for orchestration",
            "Clear boundaries between read-heavy and write-heavy flows",
          ],
        },
        {
          heading: "Validation and DTOs should reduce ambiguity",
          paragraphs: [
            "DTOs are not just there to satisfy decorators. They are a contract. Clear DTOs with strong validation reduce ambiguity between frontend and backend, improve API reliability, and make refactoring safer.",
            "I try to keep DTOs expressive and close to actual use cases rather than creating generic payload shapes that become confusing over time.",
          ],
        },
        {
          heading: "Structure for future changes",
          paragraphs: [
            "The best backend structure is not the most clever one. It is the one that makes the next change easier. When I structure NestJS applications, I am always thinking about the next module, the next feature, the next integration, and the next developer reading the code.",
            "A scalable NestJS application is usually the result of small, disciplined decisions repeated consistently.",
          ],
        },
      ],
    },
  },
  {
    slug: "integrating-microsoft-entra-id-auth-in-nextjs-and-nestjs",
    title: "Integrating Microsoft Entra ID Auth in a Next.js and NestJS App",
    excerpt:
      "How I implemented Microsoft Entra ID authentication with MSAL on the frontend, token validation in NestJS, Azure Security Group checks, user sync, and JWT session handling.",
    category: "Authentication",
    date: "April 2026",
    readingTime: "9 min read",
    featured: true,
    seoTitle:
      "Integrating Microsoft Entra ID Auth in a Next.js and NestJS App | Lazar Panović",
    seoDescription:
      "A practical guide to integrating Microsoft Entra ID authentication in a Next.js and NestJS app using MSAL, token validation, Azure Security Groups, user sync, and JWT sessions.",
    content: {
      intro:
        "One of the more useful authentication setups I implemented recently was Microsoft Entra ID auth for a full stack application built with Next.js and NestJS. The goal was not just to let users sign in with Microsoft, but to make the login flow production-ready: validate the access token on the backend, check Azure Security Group membership, sync users into the local database, and then issue our own JWT for the application session. That gave us a clean separation between Microsoft authentication and our own application authorization flow.",
      sections: [
        {
          heading: "Start with Azure App Registration",
          paragraphs: [
            "The first step is setting up the application in Azure through App Registrations. That is where the application identity is created and where the important values come from: client ID, tenant ID, and client secret.",
            "At this stage I also configure Redirect URIs for every environment. I usually add one for local development and one for each deployed environment. In practice that means local login can return to http://localhost:3000, while QA and production each get their own redirect URL. This is important because the frontend login flow needs to land back on a valid registered callback after Microsoft completes authentication.",
          ],
          bullets: [
            "Create the app registration in Azure / Microsoft Entra ID",
            "Collect client ID, tenant ID, and client secret",
            "Set Redirect URIs for local, QA, and production environments",
            "Keep environment-specific values in configuration, not in code",
          ],
        },
        {
          heading: "Configure MSAL in the Next.js app",
          paragraphs: [
            "On the frontend side I use MSAL to handle the Microsoft login flow. Once the Azure application is ready, I configure MSAL in the Next.js app using the tenant ID and client ID, and define the redirect URI that matches the current environment.",
            "After that, the login component only needs to trigger the configured MSAL login method. Once the user signs in successfully, the frontend receives the Microsoft access token. That token is then sent to the NestJS backend, where the more important validation and authorization steps happen.",
          ],
          bullets: [
            "Set up MSAL config with tenant ID, client ID, and redirect URI",
            "Use environment-based redirect URLs",
            "Trigger login through the configured MSAL method",
            "Pass the Microsoft access token to the backend after login",
          ],
          codeBlocks: [
            {
              label: "MSAL config",
              language: "ts",
              code: `import { Configuration, PublicClientApplication } from "@azure/msal-browser";
  
  export const msalConfig: Configuration = {
    auth: {
      clientId: \`\${process.env.NEXT_PUBLIC_MS_CLIENT_ID}\`,
      authority: \`https://login.microsoftonline.com/\${process.env.NEXT_PUBLIC_MS_TENANT_ID}\`,
      redirectUri: \`\${process.env.NEXT_PUBLIC_MS_REDIRECT_URI}\`,
    },
    cache: {
      cacheLocation: "localStorage",
    },
  };
  
  export const loginRequest = {
    scopes: [
      "openid",
      "profile",
      "email",
      "User.Read",
    ],
  };
  
  export const msalInstance = new PublicClientApplication(msalConfig);`,
            },
            {
              label: "Login flow",
              language: "ts",
              code: `const login = async () => {
    try {
      const loginResult = await msalInstance.loginPopup(loginRequest);
  
      const account = loginResult.account!;
      msalInstance.setActiveAccount(account);
  
      const tokenResult = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
  
      // send tokenResult.accessToken to backend
      // persist backend user and JWT in local storage
    } catch (error) {
      console.error("Login error:", error);
    }
  };`,
            },
          ],
        },
        {
          heading: "Validate the Microsoft access token on the backend",
          paragraphs: [
            "I do not treat the Microsoft access token as trusted just because it came from the frontend. In NestJS, the first backend step is validating that token against Microsoft's signing keys.",
            "For that, I use the key discovery endpoint for the tenant and verify that the token is valid before doing anything else. This step is critical because everything after that depends on the backend being sure the token really came from Microsoft and really belongs to the authenticated user.",
          ],
          bullets: [
            "Use the tenant key discovery endpoint",
            "Validate the token signature and claims on the backend",
            "Do not skip backend validation even if MSAL login succeeded on the frontend",
          ],
          codeBlocks: [
            {
              label: "Microsoft signing keys endpoint",
              language: "ts",
              code: `https://login.microsoftonline.com/\${tenantId}/discovery/v2.0/keys`,
            },
          ],
        },
        {
          heading: "Check Azure Security Group membership",
          paragraphs: [
            "After token validation, the next step in my flow is authorization through Azure Security Groups. The idea is simple: not every valid Microsoft user should automatically get access to the app. Only users who belong to one of the allowed Azure Security Groups should be let in.",
            "To do that, I fetch the groups the user belongs to and compare them against a list of allowed group IDs stored in our environment configuration. This makes group-based access control easy to manage without hardcoding access logic into the frontend.",
          ],
          bullets: [
            "Fetch the user's transitive group membership from Microsoft Graph",
            "Compare returned group IDs with allowed IDs from environment variables",
            "Reject access if the user does not belong to an allowed security group",
          ],
          codeBlocks: [
            {
              label: "Group membership request",
              language: "ts",
              code: `fetch("https://graph.microsoft.com/v1.0/me/transitiveMemberOf?$select=id&$top=999", {
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
    },
  });`,
            },
          ],
        },
        {
          heading: "Fetch the Microsoft user profile and sync the local user",
          paragraphs: [
            "Once the user is both authenticated and authorized, I fetch the basic user profile from Microsoft Graph. In my flow that includes fields such as id, mail, displayName, and userPrincipalName.",
            "That data is then matched against the local user table. If the user does not exist yet, I create a new record. If the user already exists, I compare the important fields and update them if something changed. This keeps the local application user record in sync with Microsoft without forcing me to treat Microsoft Graph as the only source of user state inside the app.",
          ],
          bullets: [
            "Fetch user profile from Microsoft Graph",
            "Create a local user if one does not exist",
            "Update local user data if profile values changed",
            "Keep Microsoft identity and local application user records aligned",
          ],
          codeBlocks: [
            {
              label: "Profile request",
              language: "ts",
              code: `fetch("https://graph.microsoft.com/v1.0/me?$select=id,mail,displayName,userPrincipalName", {
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
    },
  });`,
            },
          ],
        },
        {
          heading: "Issue your own JWT for the application session",
          paragraphs: [
            "After the Microsoft token is validated, the user is authorized by group membership, and the local user is synchronized, I issue our own JWT from the NestJS backend and return user and session data to the frontend.",
            "This is an important design choice. It means the app can rely on its own session token for protected API routes instead of using the raw Microsoft token everywhere. That gives more control over authorization, simplifies backend guards, and makes the application architecture cleaner.",
          ],
          bullets: [
            "Return local user and session data from NestJS",
            "Issue your own application JWT after Microsoft validation",
            "Use the app JWT for your own protected backend routes",
          ],
        },
        {
          heading: "Load extra user details on the frontend",
          paragraphs: [
            "After the frontend receives the successful login response and the local JWT flow is established, I do one more thing in the Next.js app: fetch the Microsoft user profile and photo for display purposes.",
            "That lets me show user information in the UI without depending only on what came back in the first login response. For the user photo, I request the Microsoft Graph photo endpoint, convert the blob to a base64 data URL, and persist it so it survives page refreshes more cleanly.",
          ],
          bullets: [
            "Fetch /me for profile data",
            "Fetch /me/photo/$value for the user image",
            "Convert the photo blob into a base64 data URL",
            "Persist display name, email, initials, and photo on the frontend",
          ],
          codeBlocks: [
            {
              label: "Fetch profile and photo",
              language: "ts",
              code: `export async function fetchUserProfile() {
    const token = await getAccessToken();
  
    const res = await fetch(\`\${GRAPH_BASE_ULR}/me\`, {
      headers: {
        Authorization: \`Bearer \${token}\`,
      },
    });
  
    return res.json();
  }
  
  export async function fetchUserPhoto(): Promise<string | null> {
    try {
      const token = await getAccessToken();
  
      const res = await fetch(\`\${GRAPH_BASE_ULR}/me/photo/$value\`, {
        headers: {
          Authorization: \`Bearer \${token}\`,
        },
      });
  
      if (!res.ok) return null;
  
      const blob = await res.blob();
  
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }`,
            },
            {
              label: "Persist profile on the frontend",
              language: "ts",
              code: `const loadUserProfile = async () => {
    const profile = await fetchUserProfile();
    const photoUrl = await fetchUserPhoto();
  
    const initials =
      profile.givenName && profile.surname
        ? \`\${profile.givenName[0]}\${profile.surname[0]}\`
        : profile.displayName
            .split(" ")
            .map((n: string) => n[0])
            .slice(0, 2)
            .join("");
  
    persistUser({
      displayName: profile.displayName,
      email: profile.userPrincipalName,
      initials,
      photoUrl,
    });
  };`,
            },
            {
              label: "Logout flow",
              language: "ts",
              code: `const logout = async () => {
    try {
      setJwt(null);
      clearPersistedUser();
      clearBackendUser();
      api.removeAuthToken();
      localStorage.removeItem(JWT_TOKEN);
      localStorage.removeItem(REDIRECT_URL);
      localStorage.removeItem("backend_user");
  
      await msalInstance.logoutPopup({
        postLogoutRedirectUri: window.location.origin,
        mainWindowRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };`,
            },
          ],
        },
        {
          heading: "Why this flow works well in real projects",
          paragraphs: [
            "What I like about this setup is that it keeps each responsibility in the right place. Microsoft Entra ID handles identity, MSAL handles the login flow on the frontend, NestJS handles backend validation and authorization, Azure Security Groups control access, and the application still keeps its own local user and JWT session model.",
            "That makes the system easier to reason about and much easier to extend later. If you need local roles, audit logging, user syncing, or environment-specific access control, this flow already gives you the right foundation.",
          ],
        },
      ],
    },
  },
  {
    slug: "building-full-stack-products-with-nextjs-and-nestjs",
    title: "Building Full Stack Products with Next.js and NestJS",
    excerpt:
      "Why I like the combination of Next.js and NestJS for modern product development, and how I think about the connection between frontend, backend, and data.",
    category: "Full Stack",
    date: "April 2026",
    readingTime: "6 min read",
    seoTitle:
      "Building Full Stack Products with Next.js and NestJS | Lazar Panović",
    seoDescription:
      "Why Next.js and NestJS work well together for full stack product development, from frontend delivery to API architecture and backend logic.",
    content: {
      intro:
        "A strong full stack product is not just a frontend connected to an API. The real value comes from how well the layers fit together: UI, routing, validation, backend logic, data, and product behavior. That is why I like the combination of Next.js and NestJS.",
      sections: [
        {
          heading: "Frontend and backend should speak the same language",
          paragraphs: [
            "When a frontend and backend evolve separately, friction appears quickly. The API shape becomes unclear, validation gets duplicated, and product behavior starts to feel inconsistent.",
            "With Next.js and NestJS, I like keeping the boundaries clear while still thinking about the full user flow end-to-end.",
          ],
        },
        {
          heading:
            "Next.js works best when the UI reflects real product structure",
          paragraphs: [
            "A frontend becomes easier to maintain when routing, views, and components follow the actual structure of the product instead of becoming a collection of disconnected screens.",
            "That is especially important in dashboards, internal tools, and data-heavy applications where user flows depend on backend behavior.",
          ],
        },
        {
          heading: "NestJS gives structure to backend complexity",
          paragraphs: [
            "On the backend side, NestJS gives a strong foundation for module boundaries, validation, services, integrations, and long-term maintainability.",
            "That becomes especially useful when the application grows beyond simple CRUD and starts to include reporting, jobs, auth flows, and more advanced business rules.",
          ],
        },
        {
          heading: "The best full stack work happens in the seams",
          paragraphs: [
            "The interesting part of full stack development is often not the frontend alone or the backend alone. It is the seam between them: data contracts, loading flows, validation, error handling, and how the product actually feels to use.",
            "That is where I try to spend the most attention when building modern web applications.",
          ],
        },
      ],
    },
  },
];
