import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { Dino } from "@prisma/client";

interface UseLovedDinosType {
    lovedItems: Dino[],
    addLovedItem: (data: Dino) => void,
    removeLovedItem: (id: string) => void,
}

export const useLovedDinos = create(
    persist<UseLovedDinosType>(
        (set,get) => ({
            lovedItems: [],
            addLovedItem: (data: Dino) => {
                const currentLovedItems = get().lovedItems;
                const existingItem = currentLovedItems.some((item) => item.id === data.id);

                if (existingItem) {
                    return toast({
                        title: "Dino already in your list 💔"
                    })
                }

                set({lovedItems: [...get().lovedItems, data]});
                
                toast({
                    title: "Dino added to your list 🦕"
                })
            },

            removeLovedItem: (id: string) => {
                set({lovedItems: [...get().lovedItems.filter((item) => item.id !== id)]});

                toast({
                    title: "Dino removed from your list 🗑"
                })
            }
        }),
        {
            name: "loved-products-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)