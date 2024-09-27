"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"
import { formSchema } from "./FormAddDIno.form";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { FormAddDinoProps } from "./FormAddDino.types";
import { useRouter } from "next/navigation";

export default function FormAddDino(props: FormAddDinoProps) {
    const { setOpenDialog } = props;
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            species: "",
            photo: "",
            price: "",
            description: "",
            length: "",
            height: "",
            period: "",
            foundIn: "",
            isPublished: false,
        },
    })
 
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setOpenDialog(false);
        try {
            await axios.post("/api/dino", values);
            toast({
                title: "Dino created successfully 🦕"
            });
            router.refresh();
        } catch (error: unknown) {
            toast({
                title: `Something went wrong: ${(error as Error).message}`,
                variant: "destructive"
            });
        }
    }

    const {isValid} = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ankylosaurus" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Species</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ankylosaurus magniventris" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="period"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                    <Input placeholder="Late Cretaceous" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="foundIn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Found in</FormLabel>
                                <FormControl>
                                    <Input placeholder="North America" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Length (in m)</FormLabel>
                                <FormControl>
                                    <Input placeholder="26" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Height (in m)</FormLabel>
                                <FormControl>
                                    <Input placeholder="17" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="lg:col-span-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="The Ankylosaurus was an armored herbivorous dinosaur with a club-like tail that lived during the Cretaceous period." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="45000" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Dino image</FormLabel>
                            <FormControl>
                                { photoUploaded ? (
                                    <p>Image uploaded!</p>
                                ) : (
                                    <UploadButton 
                                        className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                                        {...field}
                                        endpoint="photo"
                                        onClientUploadComplete={(res) => {
                                            form.setValue("photo", res?.[0].url);
                                            setPhotoUploaded(true);
                                        }}
                                        onUploadError={(error: Error) => {
                                            console.log(error);
                                        }}
                                    />
                                )}
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="m-full mt-5" disabled={!isValid}>Create Dino</Button>
            </form>
        </Form>
    )
}
