import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import CalendarSelector from "./CalendarSelector/CalendarSelector";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Dino } from "@prisma/client";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export default function ModalAddReservation(props: ModalAddReservationProps) {
    const {dino} = props;
    const [dateSelected, setDateSelected] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: new Date(), 
        to: addDays(new Date(), 5)
    });

    const onBookDino = async (dino: Dino, dateSelected: DateRange) => {
        const response = await axios.post("/api/checkout", {
            dinoId: dino.id,
            price: dino.price,
            startDate: dateSelected.from,
            endDate: dateSelected.to,
            dinoName: dino.name
        })

        window.location = response.data.url;
        toast({
            title: "Dino booked 🦕"
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full mt-3">
                    Book dino
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Select the dates you will need the dino with you</AlertDialogTitle>
                    <AlertDialogDescription>
                        <CalendarSelector setDateSelected={setDateSelected} dinoPriceDay={dino.price}/>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onBookDino(dino, dateSelected) }>Book dino</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
