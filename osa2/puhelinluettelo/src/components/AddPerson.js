import React from 'react'

const AddPerson = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}  />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson