"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import FormAddDino from "../FormAddDino/FormAddDino";

export default function ButtonAddDino() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpenDialog(true)}>
            Add new Dino
            <PlusCircle className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Dino</DialogTitle>
            <DialogDescription>
              <FormAddDino setOpenDialog={setOpenDialog}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}
