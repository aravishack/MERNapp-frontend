import React from "react";
const ListGroup = props => {
  const { listitems, onEditClick, onDeleteClick } = props;
  return (
    <ul className="list-group">
      {Object.values(listitems).map(item => {
        return (
          <div>
            <li key={item._id}>{item.title}</li>
            <button onClick={() => onEditClick(item)}>Edit</button>
            <button onClick={() => onDeleteClick(item)}>Delete</button>
          </div>
        );
      })}
    </ul>
  );
};

export default ListGroup;
