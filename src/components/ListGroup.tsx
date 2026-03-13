import { useState } from "react";
import Title from "./Title";
interface groupProps {
    names: string[];
    title: string;
    onSelected: (name: string) => void;
}
function ListGroup({ names, title, onSelected }: groupProps) {

    const [selectedRow, highlightMember] = useState(-1);

    return (
        <div className="text-primary">
            <Title title={title} />
            <ul className="list-group">
                {names.map((name, index) => <li
                    key={name}
                    onClick={() => {
                        highlightMember(index);
                        onSelected(name);
                    }} className={selectedRow === index ? "list-group-item active" : "list-group-item"}>{name}</li>
                )}
            </ul>
        </div>);
}


export default ListGroup;
