# 🔐 Auth - Référence rapide

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **auth.md**

---

## Variables d'environnement

```bash
# .env
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
```

**Générer un secret** :
```bash
openssl rand -base64 32
```

---

## Stack auth

| Techno | Rôle |
|--------|------|
| `jsonwebtoken` | Génération/vérification JWT |
| `bcryptjs` | Hash passwords |
| `cookies` (Next.js) | HTTP-only cookies |
| `middleware.ts` | Protection routes |

---

## Endpoints API

### Sign Up
**Route** : `POST /api/auth/sign-up`

**Body** :
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response** : `201 Created`
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Cookie set** : `token` (HTTP-only, 7 days expiry)

---

### Sign In
**Route** : `POST /api/auth/sign-in`

**Body** :
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** : `200 OK`
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Cookie set** : `token` (HTTP-only, 7 days expiry)

---

### Logout
**Route** : `POST /api/auth/logout`

**Response** : `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

**Cookie cleared** : `token`

---

### Get current user
**Route** : `GET /api/user`

**Headers** : Cookie `token` (auto-sent by browser)

**Response** : `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-12-15T10:00:00Z"
}
```

**Response (not authenticated)** : `401 Unauthorized`

---

## Flow d'authentification

### 1. Sign Up

```typescript
// app/(login)/sign-up/page.tsx ou component

const handleSignUp = async (email: string, password: string, name: string) => {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name })
  });

  if (response.ok) {
    // Cookie "token" set automatiquement
    router.push("/dashboard");
  }
};
```

**Backend** :
```typescript
// app/api/auth/sign-up/route.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in DB
  const user = await db.insert(users).values({
    email,
    password: hashedPassword,
    name
  }).returning();

  // Generate JWT
  const token = jwt.sign(
    { userId: user[0].id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // Set cookie
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return NextResponse.json({ user: user[0] }, { status: 201 });
}
```

---

### 2. Sign In

**Frontend** : Même pattern que Sign Up

**Backend** :
```typescript
// app/api/auth/sign-in/route.ts

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Find user
  const user = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // Set cookie
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ user });
}
```

---

### 3. Logout

```typescript
// Component

const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  router.push("/sign-in");
};
```

**Backend** :
```typescript
// app/api/auth/logout/route.ts

export async function POST() {
  cookies().delete("token");
  return NextResponse.json({ message: "Logged out successfully" });
}
```

---

## Protection des routes

### Middleware (recommandé)

**Fichier** : [middleware.ts](../../../middleware.ts)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ["/dashboard", "/settings"];
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Redirect to sign-in if not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Verify token
  if (isProtectedRoute && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      // Invalid token → clear cookie and redirect
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // Redirect to dashboard if already logged in
  if ((pathname === "/sign-in" || pathname === "/sign-up") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
```

---

### Server Component check

```typescript
// app/(dashboard)/secret/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function SecretPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    // Fetch user
    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId)
    });

    return <div>Secret content for {user.email}</div>;
  } catch (error) {
    redirect("/sign-in");
  }
}
```

---

### Client Component check (avec SWR)

```typescript
"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const ProtectedComponent = () => {
  const router = useRouter();
  const { data: user, error } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if (error || !user) {
      router.push("/sign-in");
    }
  }, [user, error, router]);

  if (!user) return <div>Loading...</div>;

  return <div>Protected content for {user.email}</div>;
};
```

---

## UserButton component

**Fichier** : [components/dashboard/user-button.tsx](../../../components/dashboard/user-button.tsx)

**Usage** :
```typescript
import { UserButton } from "@/components/dashboard/user-button";
import { Suspense } from "react";

// ⚠️ TOUJOURS wrapper dans Suspense (Next.js 16 Cache Components)
<Suspense fallback={<Button>Sign In</Button>}>
  <UserButton />
</Suspense>
```

**Implémentation** :
```typescript
"use client";

import useSWR from "swr";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const UserButton = () => {
  const { data: user, error } = useSWR("/api/user", fetcher);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/sign-in";
  };

  if (error || !user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
```

---

## Helpers (lib/auth.ts)

```typescript
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
```

---

## Utilisateur de test

```bash
# Seed via script
pnpm db:seed
```

**Credentials** :
- Email : `test@test.com`
- Password : `admin123`

---

## Security best practices

### ✅ À faire

- HTTP-only cookies (empêche XSS)
- Secure flag en production (HTTPS only)
- Hash passwords avec bcrypt (rounds: 10)
- JWT expiration (7 jours max)
- Middleware protection sur routes sensibles

### ❌ À éviter

- Stocker JWT dans localStorage (vulnérable XSS)
- Passwords en clair dans DB
- JWT sans expiration
- Secret JWT faible (<32 chars)
- Commit `.env` dans git

---

## Debug auth

### Problem : "Invalid JWT token"

**Check** :
1. `.env` contient `JWT_SECRET`
2. Secret identique dev/prod
3. Token pas expiré (< 7 jours)

**Fix** :
```bash
# Clear cookies
# F12 > Application > Cookies > Delete "token"

# Re-login
```

---

### Problem : Redirect loop

**Check** : Middleware logic

**Fix** : Voir [troubleshooting.md](../02-development/troubleshooting.md#problème--middleware-redirect-loop)

---

## 🔄 Voir aussi

- [setup-guide.md](../02-development/setup-guide.md#étape-3--vérifie-lauth) - Setup auth initial
- [troubleshooting.md](../02-development/troubleshooting.md#authentication) - Problèmes auth courants
- [database.md](database.md) - Schema users

---

*Dernière mise à jour : 2025-12-15*
