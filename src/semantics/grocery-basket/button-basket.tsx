import React from "react";
import { GroceryBasketM } from "./grocery-basket";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
};

export const ButtonBasketM = ({ className }: Props) => {
  // Временно хардкодим значения
  const totalAmount = 10; // сумма в корзине
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]; // количество товаров
  const loading = false; // флаг загрузки

  return (
    <GroceryBasketM totalAmount={totalAmount} items={items} loading={loading}>
      <Button
        className={cn("group relative", { "w-[105px]": loading }, className)}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>

        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </GroceryBasketM>
  );
};
