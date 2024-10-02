import { Dino } from "@prisma/client"
import { Dispatch, SetStateAction } from "react";

export type FormEditDinoProps = {
    dinoData: Dino;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
}