"use client";
import { Dino } from "@prisma/client";
import { ListDinosProps } from "./ListDinos.types";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { CalendarRange, Heart, LandPlot, Origami } from "lucide-react";
import ModalAddReservation from "@/components/Shared/ModalAddReservation/ModalAddReservation";
import { useLovedDinos } from "@/hooks/use-loved-dinos";

export default function ListDinos(props: ListDinosProps) {
    const {dinos} = props;
    const { lovedItems, addLovedItem, removeLovedItem } = useLovedDinos();

    return (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {dinos.map((dino: Dino) => {
            const {id, name, species, photo, period, price, foundIn} = dino;

            const likedDino = lovedItems.some((item) => item.id === id);

            return (
                <div key={id} className="p-1rounded-lg shadow-md hover:shadow-lg">
                    <Image src={photo} alt={name} width={400} height={600} className="rounded-lg" /> 
                    <div className="p-3">
                        <div className="flex flex-col mb-3 gap-x-4">
                            <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                            <p>{ formatCurrency(price) }</p>
                        </div>

                        <p className="flex items-center">
                            <Origami className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                            {species}
                        </p>
                        <p className="flex items-center">
                            <CalendarRange className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                            {period}
                        </p>
                        <p className="flex items-center">
                            <LandPlot className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                            {foundIn}
                        </p>

                        <div className="flex items-center justify-center gap-x-3">
                            <ModalAddReservation dino={dino} />
                            {
                                likedDino ? (
                                    <Heart className="mt-2 cursor-pointer fill-black" onClick={() => removeLovedItem(id)} />
                                ) : (
                                    <Heart className="mt-2 cursor-pointer" onClick={() => addLovedItem(dino)} />
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    )
}
