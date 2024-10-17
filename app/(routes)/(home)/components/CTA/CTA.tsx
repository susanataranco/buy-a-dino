import { Reveal } from "@/components/Shared/Reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function CTA() {
  return (
    <div className="p-6 lg:my-32 max-w-7xl mx-auto">
      <div className="bg-[url('/images/background-2.jpg')] bg-center bg-no-repeat bg-cover rounded-xl p-6 lg:p-32 relative">
        <div className="lg:flex gap-x-6 ">
        <div>
            <h3 className="text-4xl text-white">Adopt Your Dream Dino Today</h3>
            <p className="text-white text-xl my-5">
              Register now and explore the cute and cuddly world of dino companions!
            </p>
            <Link href="/sign-in">
              <Button variant="outline" size="lg">
                Join the Dino Family
              </Button>
            </Link>
          </div>
          <Reveal className="lg:absolute lg:-right-32 top-5" position="bottom">
            <Image
              src="/images/pterano.png"
              alt="Cute Dino"
              width={550}
              height={250}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}