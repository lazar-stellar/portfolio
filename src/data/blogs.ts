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
    slug: "auth-in-nestjs-with-jwt-refresh-tokens-and-email-verification",
    title: "How I Build Authentication in NestJS Apps",
    excerpt:
      "A practical walkthrough of how I implement authentication in NestJS using JWT access tokens, refresh tokens, email verification, password reset flows, and route protection.",
    category: "Authentication",
    date: "April 2026",
    readingTime: "8 min read",
    featured: true,
    seoTitle: "How I Build Authentication in NestJS Apps | Lazar Panović",
    seoDescription:
      "A practical guide to building authentication in NestJS with JWT access tokens, refresh tokens, email verification, password reset flows, and protected routes.",
    content: {
      intro:
        "Authentication is one of those backend areas that looks simple at first and gets more serious very quickly. Logging in a user is not enough on its own. A real application usually needs registration, hashed passwords, token-based access, refresh logic, email verification, password reset flows, and protected routes that can trust the current user. In one of my NestJS applications, I implemented an auth flow that tries to cover those real needs while still keeping the code understandable and maintainable.",
      sections: [
        {
          heading: "Start with clear user and token models",
          paragraphs: [
            "The auth flow becomes much easier to reason about when the database structure reflects the real responsibilities of the system. In my case, the user record stores identity and account state, while session and token records handle authentication lifecycle concerns separately.",
            "The user entity contains the usual account fields like email, password hash, first name, last name, and email verification state. I keep password hashes only, never raw passwords, and I also track whether the email address has been verified and when that happened.",
            "Besides the user itself, I also use a dedicated table for user sessions and another one for one-time auth tokens like email verification and password reset tokens. That separation helps because not every token in the system should behave the same way.",
          ],
          bullets: [
            "Users store identity and account state",
            "Sessions represent logged-in device or client state",
            "Auth tokens represent one-time actions like verification and password reset",
          ],
          codeBlocks: [
            {
              label: "User entity",
              language: "ts",
              code: `@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'is_email_verified', type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ name: 'email_verified_at', type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;
}`,
            },
            {
              label: "One-time auth token entity",
              language: "ts",
              code: `@Entity('auth_tokens')
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'token_hash', type: 'text' })
  tokenHash: string;

  @Column({ type: 'varchar', length: 50 })
  type: AuthTokenType;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'used_at', type: 'timestamptz', nullable: true })
  usedAt: Date | null;
}`,
            },
          ],
        },
        {
          heading: "Registration should do more than create a user",
          paragraphs: [
            "When a user registers, I first normalize the email, check whether an account already exists, and hash the password with Argon2. Hashing is one of the most important steps in the entire flow, because password storage should never rely on plain text or reversible encryption.",
            "After creating the user, I immediately generate an email verification token and send it through the mail service. That means a newly created account exists, but still cannot fully behave like a verified account until the email verification step is completed.",
            "This approach keeps the initial registration flow simple while still supporting a more secure onboarding process.",
          ],
          bullets: [
            "Normalize the email before lookup and storage",
            "Hash passwords before saving them",
            "Create a verification token right after registration",
            "Treat email verification as part of account activation",
          ],
          codeBlocks: [
            {
              label: "Register flow",
              language: "ts",
              code: `async register(dto: RegisterDto) {
  const email = dto.email.toLowerCase().trim();

  const existingUser = await this.usersService.findByEmail(email);
  if (existingUser) {
    throw new BadRequestException('User with this email already exists');
  }

  const passwordHash = await argon2.hash(dto.password);

  const user = await this.usersService.create({
    email,
    passwordHash,
    firstName: dto.firstName.trim(),
    lastName: dto.lastName.trim(),
    isEmailVerified: false,
  });

  const rawVerificationToken = await this.createEmailVerificationToken(user.id);
  await this.sendVerificationEmail(user.email, rawVerificationToken);

  return this.createAuthSession(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
  );
}`,
            },
          ],
        },
        {
          heading: "Login should verify both credentials and account state",
          paragraphs: [
            "A good login flow is not only about checking whether the password is correct. It should also verify whether the account is in the right state to log in. In my implementation, that means checking that the user exists, that the email has already been verified, and that the password matches the stored hash.",
            "That small extra check for email verification is important because it prevents the app from treating a new but unverified account as fully active.",
          ],
          codeBlocks: [
            {
              label: "Login flow",
              language: "ts",
              code: `async login(dto: LoginDto) {
  const email = dto.email.toLowerCase().trim();

  const user = await this.usersService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  if (!user.isEmailVerified) {
    throw new UnauthorizedException('Email is not verified');
  }

  const isPasswordValid = await argon2.verify(
    user.passwordHash,
    dto.password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return this.createAuthSession(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
  );
}`,
            },
          ],
        },
        {
          heading:
            "Use access tokens for API access and separate one-time tokens for account actions",
          paragraphs: [
            "One detail I like in this setup is that different token types are used for different purposes. The JWT access token is for authenticated API calls. The refresh token is for continuing a session without asking the user to log in again too often. And separate raw tokens are generated for flows like email verification and password reset.",
            "That avoids mixing responsibilities. A password reset token should not behave like a session token, and a session token should not be reused for one-time security actions.",
          ],
          codeBlocks: [
            {
              label: "Auth token type enum",
              language: "ts",
              code: `export enum AuthTokenType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
}`,
            },
          ],
        },
        {
          heading:
            "Protect routes with JWT strategy and a current user decorator",
          paragraphs: [
            "Once the user is authenticated, protected endpoints should be able to trust a validated user object without repeating auth logic in every controller. In NestJS, Passport and JWT strategy make that part clean.",
            "I use a JWT strategy that reads the access token from the Authorization header, verifies it using the configured secret, loads the user, validates the related session, and then returns a safe current-user object to the request context.",
            "That allows protected endpoints to stay very small. The controller only declares the guard and receives the current user through a custom decorator.",
          ],
          codeBlocks: [
            {
              label: "JWT strategy",
              language: "ts",
              code: `@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string; sessionId: string }) {
    const user = await this.authService.validateUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const session = await this.authService.validateSessionById(
      payload.sessionId,
      user.id,
    );

    if (!session) {
      throw new UnauthorizedException('Session is invalid');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
      sessionId: payload.sessionId,
    };
  }
}`,
            },
            {
              label: "Protected route with current user",
              language: "ts",
              code: `@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Get('me')
me(@CurrentUser() user: CurrentUserType) {
  return { user };
}`,
            },
            {
              label: "Current user decorator",
              language: "ts",
              code: `export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);`,
            },
          ],
        },
        {
          heading:
            "Email verification and password reset are part of auth, not optional extras",
          paragraphs: [
            "In many real products, authentication is not finished when login works. Users also need a secure way to verify their email and recover access if they forget their password.",
            "For both flows, I generate a random raw token, hash it before storing it in the database, and give it an expiration time. When the user later clicks the verification or reset link, I compare the raw token with stored token hashes until I find a valid match that is not expired and not already used.",
            "After a successful verification or password reset, I mark the token as used. That makes the flow one-time by design.",
          ],
          codeBlocks: [
            {
              label: "Create email verification token",
              language: "ts",
              code: `private async createEmailVerificationToken(userId: string) {
  const rawToken = this.generateRawToken();
  const tokenHash = await argon2.hash(rawToken);

  const authToken = this.authTokenRepo.create({
    userId,
    tokenHash,
    type: AuthTokenType.EMAIL_VERIFICATION,
    expiresAt: this.getEmailVerificationExpiryDate(),
    usedAt: null,
  });

  await this.authTokenRepo.save(authToken);

  return rawToken;
}`,
            },
            {
              label: "Verify email",
              language: "ts",
              code: `async verifyEmail(rawToken: string) {
  const authToken = await this.findValidEmailVerificationToken(rawToken);

  if (!authToken) {
    throw new UnauthorizedException('Invalid or expired verification token');
  }

  if (authToken.user.isEmailVerified) {
    return {
      message: 'Email is already verified',
    };
  }

  await this.usersService.markEmailAsVerified(authToken.userId);

  authToken.usedAt = new Date();
  await this.authTokenRepo.save(authToken);

  return {
    message: 'Email verified successfully',
  };
}`,
            },
            {
              label: "Reset password",
              language: "ts",
              code: `async resetPassword(token: string, newPassword: string) {
  const authToken = await this.findValidPasswordResetToken(token);

  if (!authToken) {
    throw new UnauthorizedException('Invalid or expired reset token');
  }

  const passwordHash = await argon2.hash(newPassword);

  await this.usersService.updatePassword(authToken.userId, passwordHash);
  await this.usersService.revokeAllSessionsForUser(authToken.userId);

  authToken.usedAt = new Date();
  await this.authTokenRepo.save(authToken);

  return {
    message: 'Password has been reset successfully',
  };
}`,
            },
          ],
        },
        {
          heading: "Why this auth structure works well for real applications",
          paragraphs: [
            "What I like about this setup is that it stays practical. It covers the common real-world auth requirements without turning the codebase into a maze. Registration, login, protected routes, email verification, password reset, and session-aware JWT validation all have their own clear responsibilities.",
            "The result is an auth layer that feels production-oriented, but still readable for future maintenance. And for me, that is always the goal: not just making authentication work, but making it understandable and safe to extend later.",
          ],
        },
      ],
    },
  },
  {
    slug: "how-i-handle-user-sessions-in-nestjs",
    title: "How I Handle User Sessions in NestJS",
    excerpt:
      "A practical look at how I manage user sessions in NestJS using refresh tokens, database-backed session records, token rotation, session revocation, and forced logout flows.",
    category: "NestJS",
    date: "April 2026",
    readingTime: "7 min read",
    seoTitle: "How I Handle User Sessions in NestJS | Lazar Panović",
    seoDescription:
      "Learn how to handle user sessions in NestJS with refresh tokens, database-backed session records, token rotation, revocation, and secure logout flows.",
    content: {
      intro:
        "Authentication answers the question of who the user is. Session handling answers a different question: should this user still be considered logged in right now? That distinction matters a lot in real applications. In one of my NestJS projects, I wanted sessions to be more than a long-lived token sitting on the client. I wanted the backend to be able to validate, rotate, revoke, and invalidate sessions when sensitive actions happen. That led me to a simple but useful session model built around refresh tokens and a dedicated user_sessions table.",
      sections: [
        {
          heading: "Store sessions in the database, not only in the token",
          paragraphs: [
            "One of the key decisions in my implementation was not relying only on JWTs as the entire source of truth. Instead, I store each refresh-token-based session in the database.",
            "That gives the backend real control. A session can be revoked, checked for expiration, or invalidated after a password change. Without that database record, the backend would have fewer options once a token is issued.",
          ],
          codeBlocks: [
            {
              label: "User session entity",
              language: "ts",
              code: `@Entity('user_sessions')
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'refresh_token_hash', type: 'text' })
  refreshTokenHash: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt: Date | null;
}`,
            },
          ],
        },
        {
          heading: "Create a session when the user authenticates successfully",
          paragraphs: [
            "After login or registration succeeds, I create a new session record and issue both an access token and a refresh token. The access token is short-lived and used for normal API requests. The refresh token is longer-lived and is tied to the session record in the database.",
            "One small implementation detail I like here is that the session is created first, then its database ID is included in both JWT payloads as sessionId. That means every future request can be tied back to a concrete stored session.",
          ],
          codeBlocks: [
            {
              label: "JWT payload",
              language: "ts",
              code: `export interface JwtPayload {
  sub: string;
  email: string;
  sessionId: string;
}`,
            },
            {
              label: "Create auth session",
              language: "ts",
              code: `private async createAuthSession(
  userId: string,
  email: string,
  firstName: string | null,
  lastName: string | null,
) {
  const accessExpiresIn = this.getAccessTokenExpiresIn();
  const refreshExpiresIn = this.getRefreshTokenExpiresIn();
  const expiresAt = this.getRefreshTokenExpiryDate(refreshExpiresIn);

  const temporarySession = await this.usersService.createSession({
    userId,
    refreshTokenHash: 'pending',
    expiresAt,
  });

  const payload: JwtPayload = {
    sub: userId,
    email,
    sessionId: temporarySession.id,
  };

  const accessToken = await this.jwtService.signAsync(payload, {
    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    expiresIn: accessExpiresIn,
  });

  const refreshToken = await this.jwtService.signAsync(payload, {
    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    expiresIn: refreshExpiresIn,
  });

  const refreshTokenHash = await argon2.hash(refreshToken);

  await this.usersService.updateSessionTokenHash(
    temporarySession.id,
    refreshTokenHash,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: userId,
      email,
      firstName,
      lastName,
    },
  };
}`,
            },
          ],
        },
        {
          heading: "Hash refresh tokens before storing them",
          paragraphs: [
            "A pattern I strongly prefer is hashing refresh tokens before saving them to the database. That is similar to how passwords are handled. If the database were ever exposed, raw refresh tokens should not be readable in plain form.",
            "In this setup, the client keeps the raw refresh token, while the backend stores only a hashed version. Later, when the client sends the refresh token to request new access, the backend verifies it against the stored hash.",
          ],
          bullets: [
            "Raw refresh token lives only on the client side",
            "Database stores only the token hash",
            "Argon2 verification is used during refresh",
          ],
        },
        {
          heading:
            "Refresh flow should rotate the session, not just extend it blindly",
          paragraphs: [
            "The refresh endpoint is where session handling becomes more than basic JWT usage. In my implementation, the backend first verifies the refresh token signature, loads the related user and session, checks whether the session is revoked or expired, and then verifies the token against the stored token hash.",
            "Once that succeeds, I revoke the old session and create a brand new one. That means refresh token usage rotates the session instead of endlessly reusing the same stored token state.",
            "This gives better control and reduces the chance of a stolen refresh token staying useful for too long.",
          ],
          codeBlocks: [
            {
              label: "Refresh flow with session rotation",
              language: "ts",
              code: `async refresh(dto: RefreshTokenDto) {
  const payload = await this.verifyRefreshToken(dto.refreshToken);

  const user = await this.usersService.findById(payload.sub);
  if (!user) {
    throw new UnauthorizedException('Invalid refresh token');
  }

  const session = await this.usersService.findSessionById(payload.sessionId);
  if (!session || session.revokedAt) {
    throw new UnauthorizedException('Session is invalid');
  }

  if (session.expiresAt.getTime() < Date.now()) {
    throw new UnauthorizedException('Refresh token expired');
  }

  const isRefreshTokenValid = await argon2.verify(
    session.refreshTokenHash,
    dto.refreshToken,
  );

  if (!isRefreshTokenValid) {
    throw new UnauthorizedException('Invalid refresh token');
  }

  await this.usersService.revokeSession(session.id);

  return this.createAuthSession(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
  );
}`,
            },
          ],
        },
        {
          heading: "Validate the session on every protected request",
          paragraphs: [
            "A very useful part of this setup is that access-token validation is not based only on token signature and expiry. The JWT strategy also checks the related session record in the database.",
            "That means even a valid-looking access token should not be trusted if its session has already been revoked or expired. This is one of the main benefits of combining JWT auth with database-backed sessions.",
          ],
          codeBlocks: [
            {
              label: "Session validation",
              language: "ts",
              code: `async validateSessionById(sessionId: string, userId: string) {
  const session = await this.usersService.findSessionById(sessionId);

  if (!session) {
    return null;
  }

  if (session.userId !== userId) {
    return null;
  }

  if (session.revokedAt) {
    return null;
  }

  if (session.expiresAt.getTime() < Date.now()) {
    return null;
  }

  return session;
}`,
            },
          ],
        },
        {
          heading: "Logout and password changes should revoke sessions",
          paragraphs: [
            "A session system becomes really useful when the backend can actively kill sessions. In my implementation, logout revokes the current session, while password reset and password change revoke all active sessions for that user.",
            "That is a strong real-world security improvement. If a user changes their password because of suspicion or account recovery, all older sessions should stop being trusted.",
          ],
          codeBlocks: [
            {
              label: "Logout flow",
              language: "ts",
              code: `async logout(dto: LogoutDto) {
  const payload = await this.verifyRefreshToken(dto.refreshToken);
  const session = await this.usersService.findSessionById(payload.sessionId);

  if (session && !session.revokedAt) {
    await this.usersService.revokeSession(session.id);
  }

  return { success: true };
}`,
            },
            {
              label: "Revoke all sessions for a user",
              language: "ts",
              code: `async revokeAllSessionsForUser(userId: string) {
  await this.sessionsRepository
    .createQueryBuilder()
    .update()
    .set({ revokedAt: new Date() })
    .where('user_id = :userId', { userId })
    .andWhere('revoked_at IS NULL')
    .execute();
}`,
            },
            {
              label: "Change password and invalidate all sessions",
              language: "ts",
              code: `async changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
) {
  const user = await this.usersService.findById(userId);

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  const isCurrentPasswordValid = await argon2.verify(
    user.passwordHash,
    currentPassword,
  );

  if (!isCurrentPasswordValid) {
    throw new UnauthorizedException('Current password is incorrect');
  }

  const passwordHash = await argon2.hash(newPassword);

  await this.usersService.updatePassword(userId, passwordHash);
  await this.usersService.revokeAllSessionsForUser(userId);

  return {
    message: 'Password changed successfully. Please log in again.',
  };
}`,
            },
          ],
        },
        {
          heading: "Why I prefer this session model",
          paragraphs: [
            "What I like about this approach is that it stays understandable while giving the backend meaningful control over user sessions. It supports token rotation, revocation, forced logout, and session-aware request validation without becoming too complex.",
            "It also mirrors the way I like to design backend systems in general: keep the flow explicit, store security-critical state intentionally, and avoid pretending that a JWT by itself solves the whole session problem.",
            "For me, that is the real value of session handling in NestJS. It is not just about keeping a user logged in. It is about making that state trustworthy.",
          ],
        },
      ],
    },
  },
];
