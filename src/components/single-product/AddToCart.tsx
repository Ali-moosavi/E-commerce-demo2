"use client";

import { useEffect, useState } from "react";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  getCartStatus,
  createCart,
  getProductCartQuantity,
  updateCartItemQuantity,
} from "@/lib/data";

interface AddToCartProps {
  user: any;
  productId: string;
}

export default function AddToCart({ user, productId }: AddToCartProps) {
  const effectiveUserId = user?.id;
  const [Quantity, setQuantity] = useState(0);
  const [isPending, setIsPending] = useState(false);

  // Load initial quantity from database when component mounts
  useEffect(() => {
    if (!effectiveUserId || !productId) return;

    const fetchInitialQuantity = async () => {
      const currentQty = await getProductCartQuantity(
        effectiveUserId,
        productId,
      );
      setQuantity(currentQty);
    };

    fetchInitialQuantity();
  }, [effectiveUserId, productId]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (!effectiveUserId || isPending) return;

    setIsPending(true);
    try {
      let cart = await getCartStatus(effectiveUserId);
      if (!cart) {
        cart = await createCart(effectiveUserId);
      }

      await updateCartItemQuantity(cart.id, productId, newQuantity);
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Failed to update cart:", error);
    } finally {
      setIsPending(false);
    }
  };

  if (Quantity === 0) {
    return (
      <button
        type="button"
        disabled={!effectiveUserId || isPending}
        onClick={() => handleQuantityChange(1)}
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
        onClick={() => handleQuantityChange(Quantity + 1)}
        className="flex size-9 items-center justify-center rounded-md hover:bg-[#fff0f1] disabled:opacity-50"
      >
        <Plus className="size-5" />
      </button>
      <span
        className="min-w-8 text-center text-sm font-[iransansBold]"
        aria-live="polite"
      >
        {Quantity}
      </span>
      <button
        type="button"
        disabled={isPending}
        aria-label={Quantity === 1 ? "حذف محصول" : "کاهش تعداد"}
        onClick={() => handleQuantityChange(Quantity - 1)}
        className="flex size-9 items-center justify-center rounded-md hover:bg-[#fff0f1] disabled:opacity-50"
      >
        {Quantity === 1 ? (
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
