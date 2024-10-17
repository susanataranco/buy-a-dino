import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
  categoryOurDinos,
  dataFirstBlockOurDinos,
  dataSecondBlockOurDinos,
} from "./OurDinos.data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function OurDinos() {
  return (
    <div className="max-w-6xl mx-auto text-center py-12 lg:py-40 p-6">
      <h3 className="text-2xl lg:text-6xl font-bold">We ❤️ dinos</h3>
      <p className="text-lg mt-2 lg:mt-5 lg:text-xl text-center w-full mx-auto max-w-2xl mb-5 lg:mb-10">
      Don’t miss out on the joy of having the cutest dinos by your side—rent your dino companion today!
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 items-center justify-center mb-5 max-w-2xl mx-auto">
        {categoryOurDinos.map(({ name, active }) => (
          <div
            key={name}
            className={cn(
              "rounded-xl py-2 px-3",
              active ? "bg-black text-white" : "bg-slate-100"
            )}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="mb-10">
        <div className="grid grid-cols-3 gap-x-6 mb-6">
          {dataFirstBlockOurDinos.map(({ url }) => (
            <div key={url}>
              <Image
                src={`/images/dinos/${url}`}
                alt="Dino"
                width={400}
                height={300}
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-x-6 max-w-5xl mx-auto">
          {dataSecondBlockOurDinos.map(({ url }) => (
            <div key={url}>
              <Image
                src={`/images/dinos/${url}`}
                alt="Dino"
                width={400}
                height={300}
                className="rounded-xl aspect-[3/2]"
              />
            </div>
          ))}
        </div>
      </div>
      <Link href="/dinos">
        <Button className="rounded-xl p-6 text-lg mt-5" variant="outline">
          Show all types
          <MoveRight className="ml-2" />
        </Button>
      </Link>
    </div>
  );
}