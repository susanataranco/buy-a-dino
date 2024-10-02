"use client";
import { Button } from "@/components/ui/button";
import { ButtonEditDinoProps } from "./ButtonEditDino.types";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import FormEditDino from "../FormEditDino/FormEditDino";

export default function ButtonEditDino(props: ButtonEditDinoProps) {
    const {dinoData} = props;
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Dialog open={openDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpenDialog(true)}>
                    Edit Dino
                    <Pencil className="w-4 h-4 ml-2" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        <FormEditDino setOpenDialog={setOpenDialog} dinoData={dinoData} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
