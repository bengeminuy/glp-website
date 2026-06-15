import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// TODO: real checkout flow
// - read cart / single-product context
// - verify the patient has a 'reviewed' intake on file before allowing payment
// - create a Stripe PaymentIntent (or Checkout Session) server-side
// - wire the corresponding webhook handler in /api/stripe/webhook
export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-600">
            Checkout isn&apos;t wired up yet. Add <code>STRIPE_SECRET_KEY</code> to{" "}
            <code>.env.local</code> and implement the PaymentIntent creation in this file
            plus the webhook handler in <code>/api/stripe/webhook</code>.
          </p>
          <Link href="/account">
            <Button variant="outline">Back to account</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
