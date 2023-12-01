import { useState } from 'react';
import List from './List';

export default function ProjectDashboard({
  handleProjectDelete,
  handleAddList,
  handleAddTask,
  projectIndex,
  projectObj,
}) {
  const [inputValue, setInputValue] = useState(''); // input value for "new project" text field
  const [query, setQuery] = useState('');
  const listsArray = projectObj.lists;
  const projectName = projectObj.name;
  const projectId = projectObj.id;

  // updates inputValue to be user inputed value everytime a change is detected
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // creates a new list object and adds it array of lists
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === '') return;
    let newListObj = createList(inputValue);
    handleAddList(newListObj, projectIndex); // calls parent function
    setInputValue('');
  };

  // create a new list object
  function createList(listName) {
    return {
      id: Date.now().toString(),
      name: listName,
      tasks: [],
    };
  }

  // filter lists based on query
  const filteredLists = listsArray.filter((list) =>
    list.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="project-display-div">
        <div className="project-display-header-div">
          <h1>{projectName}</h1>
          <button onClick={handleProjectDelete}> delete project</button>
          <div>
            Search:
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search lists"
            />
          </div>
          <form action="" className="new-list-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="New list"
              aria-label="New list"
            />
            <button type="submit" className="btn-create" aria-label="create new list">
              +
            </button>
          </form>
        </div>
        <hr className="line" />
        <div className="project-display-lists-div">
          {filteredLists.length === 0 ? (
            <p>No list found</p>
          ) : (
            filteredLists.map((list) => (
              /* call function here and pass it "list"*/
              <List
                key={list.id}
                listObj={list}
                handleAddTask={handleAddTask}
                projectId={projectId}
                listId={list.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

// .map can return the index if I have time refactor code so that I don't have to find manually
// find the indexs to add a list or task
