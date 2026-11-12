"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  getCurrentProductCartQuantity,
  setCurrentProductCartQuantity,
} from "@/components/actions/actions";
import { authClient } from "@/lib/auth-clients";

interface AddToCartProps {
  productId: string;
}

interface CartSnapshot {
  userId: string;
  productId: string;
  quantity: number;
}

export default function AddToCart({ productId }: AddToCartProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    data: session,
    isPending: sessionPending,
    refetch: refetchSession,
  } = authClient.useSession();
  const [cartSnapshot, setCartSnapshot] = useState<CartSnapshot | null>(null);
  const [isPending, setIsPending] = useState(false);
  const userId = session?.user.id;
  const snapshotIsCurrent =
    cartSnapshot?.userId === userId && cartSnapshot?.productId === productId;
  const quantity = snapshotIsCurrent ? cartSnapshot.quantity : 0;
  const isLoadingQuantity = sessionPending || Boolean(userId && !snapshotIsCurrent);

  useEffect(() => {
    if (sessionPending || !userId || !productId) return;

    let cancelled = false;
    (async () => {
      try {
        const currentQty = await getCurrentProductCartQuantity(productId);
        if (!cancelled) {
          setCartSnapshot({ userId, productId, quantity: currentQty });
        }
      } catch (error) {
        console.error("Failed to load cart quantity:", error);
        if (!cancelled) {
          setCartSnapshot({ userId, productId, quantity: 0 });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, sessionPending, productId]);

  useEffect(() => {
    const refreshSessionWhenVisible = () => {
      if (document.visibilityState === "visible") {
        void refetchSession();
      }
    };

    window.addEventListener("focus", refreshSessionWhenVisible);
    document.addEventListener("visibilitychange", refreshSessionWhenVisible);
    return () => {
      window.removeEventListener("focus", refreshSessionWhenVisible);
      document.removeEventListener("visibilitychange", refreshSessionWhenVisible);
    };
  }, [refetchSession]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (!userId || isPending) return;

    setIsPending(true);
    try {
      const updatedQuantity = await setCurrentProductCartQuantity(
        productId,
        Math.max(newQuantity, 0),
      );
      setCartSnapshot({ userId, productId, quantity: updatedQuantity });
    } catch (error) {
      console.error("Failed to update cart:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleAdd = () => {
    if (!userId) {
      router.push(
        `/user/registeration?redirect=${encodeURIComponent(pathname)}`,
      );
      return;
    }
    handleQuantityChange(1);
  };

  if (quantity === 0) {
    return (
      <button
        type="button"
        disabled={sessionPending || isLoadingQuantity || isPending}
        onClick={handleAdd}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ef4056] text-sm font-[iransansBold] text-white transition hover:bg-[#d9364d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <AddShoppingCartRoundedIcon sx={{ fontSize: 20 }} />
        <span>افزودن به سبد خرید</span>
      </button>
    );
  }

  return (
    <div
      className="flex h-12 w-full items-center justify-between rounded-lg border border-[#ef4056] bg-white px-2 text-[#ef4056]"
      aria-label="کنترل تعداد محصول"
    >
      <button
        type="button"
        disabled={isPending}
        aria-label="افزایش تعداد"
        onClick={() => handleQuantityChange(quantity + 1)}
        className="flex size-9 items-center justify-center rounded-md hover:bg-[#fff0f1] disabled:opacity-50"
      >
        <Plus className="size-5" />
      </button>

      <span
        className="min-w-8 text-center text-sm font-[iransansBold]"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        disabled={isPending}
        aria-label={quantity === 1 ? "حذف محصول" : "کاهش تعداد"}
        onClick={() => handleQuantityChange(quantity - 1)}
        className="flex size-9 items-center justify-center rounded-md hover:bg-[#fff0f1] disabled:opacity-50"
      >
        {quantity === 1 ? (
          <Trash2 className="size-4" />
        ) : (
          <Minus className="size-5" />
        )}
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() => handleQuantityChange(0)}
        aria-label="حذف محصول از سبد خرید"
        className="mr-1 flex size-9 items-center justify-center rounded-md text-[#81858b] hover:bg-[#f7f7f8] hover:text-[#ef4056] disabled:opacity-50"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
