import { useState } from "react";
interface groupProps {
    names: string[];
    title: string;
    onSelected: (name: string) => void;
}
function ListGroup({ names, title, onSelected }: groupProps) {

    const [selectedRow, highlightMember] = useState(-1);

    return (
        <div className="mx-5">
            <h1>{title}</h1>
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
