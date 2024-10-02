import DinoCard from "./DinoCard/DinoCard";
import { ListDinosProps } from "./ListDinos.types";

export default function ListDinos(props: ListDinosProps) {
    const {dinos} = props;
        
    return (
        <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
            {dinos.map((dino) => (
                <DinoCard key={dino.id} dino={dino}/>
            ))}
        </div>
    )
}
