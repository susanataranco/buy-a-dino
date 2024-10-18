"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { CalendarSelectorProps } from "./CalendarSelector.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { DayPickerProvider } from 'react-day-picker';

export default function CalendarSelector(props: CalendarSelectorProps) {
    const {setDateSelected, className, dinoPriceDay} = props;
    const [date, setDate] = useState<DateRange | undefined>({from: new Date(), to: addDays(new Date(), 5)});

    useEffect(() => {
      setDateSelected({from: date?.from, to: date?.to});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const calculateDaysBetween = (from: Date, to: Date): number => {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffInTime = to.getTime() - from.getTime();
        return Math.round(diffInTime / oneDay);
    }

    const daysBetween = date?.from && date?.to ? calculateDaysBetween(date.from, date.to) : 0;
    
    return (
        <>
            <div className={cn("grid gap-2", className)}>
                {date?.from && date?.to && (
                    <>
                        <p className="mt-4 text-lg text-black">Total days: {daysBetween}</p>
                        <p className="mb-4 text-md">Total price: {formatCurrency((daysBetween * Number(dinoPriceDay)).toString())} (Tax incl.)</p>
                    </>
                )}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button 
                            variant="outline" 
                            className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
                                <CalendarIcon className="w-4 h-4 mr-2"/>
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} - {""}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    ) 
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0 z-50" align="start">
                        <DayPickerProvider initialProps={{ mode: "range", defaultMonth: date?.from, selected: date, numberOfMonths: 2 }}>
                            <div onClick={(e) => e.stopPropagation()} style={{ pointerEvents: 'auto' }}>
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </div>
                        </DayPickerProvider>
                    </PopoverContent>
                </Popover>
            </div>
        
        </>
    )
}
