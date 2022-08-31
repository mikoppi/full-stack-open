import { useEffect, useState } from "react";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.some((person) => person.name === newName) &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      let personToUpdate = persons.find((person) => person.name === newName);
      let filteredPersonToUpdate = filteredPersons.find(
        (person) => person.name === newName
      );
      personService
        .update(personToUpdate.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== personToUpdate.id ? person : returnedPerson
            )
          );
          setFilteredPersons(
            filteredPersons.map((person) =>
              person.id !== filteredPersonToUpdate.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          setSuccess(true);
          setMessage(`Changed number for ${personToUpdate.name}`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }).catch(error => {
          setSuccess(false)
          setMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${personObject.name}`);
        setNewName("");
        setNewNumber("");
        setSuccess(true);
      })
      .catch(error => {
        setSuccess(false)
        setMessage(`${error.response.data.error}`);
        console.log(error.response.data);
      })

      setTimeout(() => {
          setMessage("");
        }, 5000);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setNewFilter(e.target.value);
    console.log(newFilter);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .deleteItem(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .then(
          setFilteredPersons(
            filteredPersons.filter((person) => person.id !== id)
          )
        )
        .then(() => {
          setSuccess(true);
          setMessage(`Deleted ${name}`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }).catch(error => {
          setSuccess(false)
          setMessage(`${name} has already been removed from server`)
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <AddPerson
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        //not the best idea to alternate between two states as props
        persons={newFilter !== "" ? filteredPersons : persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
