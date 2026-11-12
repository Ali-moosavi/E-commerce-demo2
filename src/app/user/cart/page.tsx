import CartClient from "@/components/cart/CartClient";
import { getUserCart } from "@/components/actions/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id ?? "";
  const cart = await getUserCart(userId);

  return <CartClient userId={userId} initialCart={cart} />;
}
