import Image from "next/image";
import { FormFrete } from "./components/FormFrete";
import { ContainerFrete } from "./components/ContainerFrete";

export default function Home() {
  return (
    <main className="fixed overflow-x-hidden gap-16 p-8 lg:flex lg:justify-between items-center bg-yellow-300 w-screen h-screen">
      

      <FormFrete />
      <ContainerFrete />

      
      
      
    </main>
  );
}
