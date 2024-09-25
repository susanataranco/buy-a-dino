import Image from 'next/image';

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div className="grid lg:grid-cols-2 h-full items-center justify-center">
        <div className="flex items-center justify-center">{children}</div>
        <div className="hidden lg:flex lg:bg-slate-300 justify-center items-center lg:flex-col">
            <Image src="/logo.svg" alt="Buy a Dino" width={80} height={80}></Image>
            <h1 className="text-xl font-bold">Buy a Dino</h1>
        </div>
    </div>
  )
}
