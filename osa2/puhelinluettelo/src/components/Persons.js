import React from "react";

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p key={person.name}>
            {person.name} {person.number}
          </p>
          <button key={person.id} onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
