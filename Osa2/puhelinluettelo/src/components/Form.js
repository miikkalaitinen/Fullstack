const Form = ({handleSubmit, handleNewNumber, handleNameChange, newName, newNumber}) => {

    return (
        <>
            <h3>Add new number</h3>
            <form onSubmit={handleSubmit}>
                <div>
                name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                number : <input value={newNumber} onChange={handleNewNumber}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default Form