# 💳 Stripe - Référence rapide

> **Breadcrumb** : [CLAUDE.md](../../../CLAUDE.md) → [00-start-here.md](../00-start-here.md) → **stripe.md**

---

## Variables d'environnement

```bash
# .env
STRIPE_SECRET_KEY="sk_test_51xxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_51xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
```

**Où les trouver** :
- Dashboard Stripe → Developers → API keys
- Test mode activé (toggle en haut à droite)

---

## Setup local

### Terminal 1 : Dev server
```bash
pnpm dev
```

### Terminal 2 : Stripe CLI
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Output** :
```
> Ready! Your webhook signing secret is whsec_abc123...
```

Copie `whsec_...` dans `.env` comme `STRIPE_WEBHOOK_SECRET`

---

## Cartes de test

| Carte | Numéro | Résultat |
|-------|--------|----------|
| Success | `4242 4242 4242 4242` | ✅ Paiement réussi |
| Decline | `4000 0000 0000 0002` | ❌ Carte refusée |
| 3D Secure | `4000 0027 6000 3184` | 🔐 Requiert 3DS |

**Tous les détails** : https://stripe.com/docs/testing

**Autres infos** :
- Expiration : N'importe quelle date future
- CVC : N'importe quel 3 chiffres
- ZIP : N'importe quel code postal

---

## Endpoints API

### Webhook handler
**Route** : `POST /api/webhooks/stripe`

**Fichier** : [app/api/webhooks/stripe/route.ts](../../../app/api/webhooks/stripe/route.ts)

**Events gérés** :
- `customer.subscription.created` - Nouvel abonnement
- `customer.subscription.updated` - Changement de plan
- `customer.subscription.deleted` - Annulation
- `invoice.payment_succeeded` - Paiement réussi
- `invoice.payment_failed` - Paiement échoué

**Pattern** :
```typescript
export async function POST(request: Request) {
  const body = await request.text(); // ← Important: .text() pas .json()
  const signature = request.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "customer.subscription.created":
      // Handle new subscription
      break;
    case "customer.subscription.deleted":
      // Handle cancellation
      break;
  }

  return NextResponse.json({ received: true });
}
```

---

## Client Stripe

**Fichier** : [lib/stripe.ts](../../../lib/stripe.ts)

**Usage** :
```typescript
import { stripe } from "@/lib/stripe";

// Créer un checkout session
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  payment_method_types: ["card"],
  line_items: [
    {
      price: "price_abc123", // Price ID du produit
      quantity: 1
    }
  ],
  success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`
});

// Redirect vers checkout
redirect(session.url);
```

---

## Flow de checkout

### 1. User clique "Subscribe" sur pricing page

```typescript
// app/(marketing)/pricing/page.tsx ou component

const handleSubscribe = async (priceId: string) => {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId })
  });

  const { url } = await response.json();
  window.location.href = url; // Redirect vers Stripe Checkout
};
```

---

### 2. Server crée session Checkout

```typescript
// app/api/create-checkout-session/route.ts

export async function POST(request: Request) {
  const { priceId } = await request.json();
  const token = cookies().get("token")?.value;
  const user = await verifyToken(token);

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`
  });

  return NextResponse.json({ url: session.url });
}
```

---

### 3. User complete paiement sur Stripe

- Redirection vers Stripe Checkout hosted page
- User entre infos carte
- Stripe valide paiement

---

### 4. Webhook reçu

```
customer.subscription.created → /api/webhooks/stripe
```

**Handler** :
```typescript
case "customer.subscription.created":
  const subscription = event.data.object;

  // Update database
  await db.insert(subscriptions).values({
    userId: subscription.metadata.userId,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0].price.id,
    status: subscription.status
  });
  break;
```

---

### 5. Redirect vers success page

User arrive sur `/dashboard?success=true`

---

## Produits de test

### Créer un produit

**Via Dashboard** :
1. Dashboard → Products → Add product
2. Name : "Starter Plan"
3. Price : $9.00 / month
4. Copie le **Price ID** : `price_abc123...`

**Via CLI** :
```bash
# Créer le produit
stripe products create \
  --name="Starter Plan" \
  --description="Basic features"

# Créer le prix (récupère product ID de la commande précédente)
stripe prices create \
  --product=prod_abc123 \
  --currency=usd \
  --unit-amount=900 \
  --recurring[interval]=month
```

**Output** : Price ID `price_abc123...`

---

### Utiliser dans le code

```typescript
const PRICING_PLANS = [
  {
    name: "Starter",
    price: "$9/month",
    priceId: "price_abc123..." // ← Price ID du Dashboard
  },
  {
    name: "Pro",
    price: "$29/month",
    priceId: "price_def456..."
  }
];
```

---

## Tester les webhooks

### Trigger événement manuel

**Via CLI** :
```bash
stripe trigger customer.subscription.created
```

**Via Dashboard** :
1. Developers → Events
2. "Send test webhook"
3. Select event type
4. Click "Send test webhook"

---

### Vérifier logs

**Terminal 2** (Stripe CLI) :
```
  customer.subscription.created    [200] POST http://localhost:3000/api/webhooks/stripe
```

**200** = Success ✅
**400/500** = Error ❌ (check logs)

---

## Debug webhooks

### Erreur : 400 Bad Request

**Cause** : `STRIPE_WEBHOOK_SECRET` incorrect

**Fix** :
1. Check `stripe listen` output
2. Copie le bon secret (`whsec_...`)
3. Update `.env`
4. Restart dev server

---

### Erreur : Webhook signature failed

**Cause** : Body parsé avant verification

**Fix** : Utilise `.text()` pas `.json()`
```typescript
const body = await request.text(); // ✅
// const body = await request.json(); ❌
```

---

## Production setup

### Webhooks production

1. Dashboard → Developers → Webhooks
2. "Add endpoint"
3. Endpoint URL : `https://your-domain.com/api/webhooks/stripe`
4. Events : Select all `customer.subscription.*` et `invoice.*`
5. Copie le **Signing secret** : `whsec_...`
6. Ajoute dans variables d'env production (Vercel, Railway, etc.)

---

### Clés production

1. Dashboard → Toggle "Test mode" OFF
2. Copie les clés **live** (`pk_live_...`, `sk_live_...`)
3. Ajoute dans variables d'env production
4. ⚠️ **JAMAIS** commit les clés live dans git !

---

## Commandes utiles

```bash
# Login Stripe CLI
stripe login

# Listen webhooks local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test event
stripe trigger customer.subscription.created

# List products
stripe products list

# List prices
stripe prices list

# View customer
stripe customers retrieve cus_abc123

# Cancel subscription
stripe subscriptions cancel sub_abc123
```

---

## 🔄 Voir aussi

- [setup-guide.md](../02-development/setup-guide.md#étape-4--configuration-stripe-optionnel) - Installation Stripe complète
- [troubleshooting.md](../02-development/troubleshooting.md#stripe) - Problèmes Stripe courants
- [tech-stack.md](../01-architecture/tech-stack.md#stripe-latest) - Détails techniques Stripe

**Docs officielles** : https://stripe.com/docs

---

*Dernière mise à jour : 2025-12-15*
