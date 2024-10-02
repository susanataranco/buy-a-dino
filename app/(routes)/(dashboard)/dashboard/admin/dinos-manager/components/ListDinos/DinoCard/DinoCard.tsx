"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import  { CalendarRange, LandPlot, Origami, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { DinoCardProps } from "./DinoCard.types";
import ButtonEditDino from "./ButtonEditDino/ButtonEditDino";
import { formatCurrency } from "@/utils/formatCurrency";
import axios from "axios";

export default function DinoCard(props: DinoCardProps) {
    const {dino} = props;
    const router = useRouter();

    const deleteDino = async () => {
        try {
            await axios.delete(`/api/dino/${dino.id}`);
            toast({ title: "Dino deleted 🦕" });
            router.refresh();
        } catch (error: unknown) {  
            toast({
                    title: `Something went wrong: ${(error as Error).message}`,
                    variant: "destructive"
                });
        }
    }

    const handlePublishDino = async (published: boolean) => {
        try {
            await axios.patch(`/api/dino/${dino.id}`, {isPublished: published});
            toast({
                title: published ? "Dino published 🦕" : "Dino unpublished 🦕"
            });
            router.refresh();
        } catch (error: unknown) {
            toast({
                title: `Something went wrong: ${(error as Error).message}`,
                variant: "destructive"
            });
        }
    }

    return (
        <div className="relative p-1 bg-wide rounded-lg shadow-md hover:shadow-lg">
            <Image src={dino.photo} alt={dino.name} width={400} height={600} className="rounded-lg" />
            {dino.isPublished ?
            (
                <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">Published</p>
            ) :
            (
                <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">Not published</p>
            )}

            <div className="relative p-3">
                <div className="flex flex-col mb-3 gap-x-4">
                    <p className="text-xl min-h-16 lg:min-h-fit">{dino.name}</p>
                    <p>{formatCurrency(dino.price)}</p>
                </div>

                <div className="grid gap-x-4">
                    <p className="flex items-center">
                        <Origami className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                        {dino.species}
                    </p>
                    <p className="flex items-center">
                        <CalendarRange className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                        {dino.period}
                    </p>
                    <p className="flex items-center">
                        <LandPlot className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                        {dino.foundIn}
                    </p>
                </div>

                <div className="flex justify-between mt-3 gap-x-4">
                    <Button variant="outline" onClick={() => deleteDino() }>
                        Delete
                        <Trash className="w-4 h-4 ml-2" />
                    </Button>

                    <ButtonEditDino dinoData={dino}/>
                </div>

                { dino.isPublished ? (
                    <Button className="w-full mt-3" variant="outline" onClick={() => handlePublishDino(false) }>
                        Unpublish
                        <Upload className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button className="w-full mt-3" onClick={() => handlePublishDino(true) }>
                        Publish
                        <Upload className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    )
}
