import React, { useState, useRef, useEffect } from 'react';

//Incorporates a functionality suite that allows users to edit the names of Projects, List entries, and tasks

export function RenameProject({
    handleRenameProject,
    selectedProjectId,
}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Updates name of selected project
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue === '') return;
        let newName = inputValue;
        let projectId = selectedProjectId;
        handleRenameProject(newName, projectId);
        document.removeEventListener('renameFlag', handleRenameEvent)
        const renameBox = document.getElementById('renameBox');
        renameBox.style.display = 'none';
        setInputValue('');
        setInitialClick(3);
    };

    //Displays renaming feature
    const handleRenameEvent = () => {
        const renameBox = document.getElementById('renameBox');
        renameBox.style.display = 'block';
    };

    const handleCancelButton = () => {
        document.removeEventListener('renameFlag', handleRenameEvent);
        const renameBox = document.getElementById('renameBox');
        renameBox.style.display = 'none';
        setInputValue('');
    };



    const [initialClick, setInitialClick] = useState(3);
    const renameRef = useRef();

    useEffect(() => {
        const closeRename = (e) => {
            {
                if (initialClick!==0) {
                    setInitialClick(initialClick-1);
                    return;
                }
                else {
                    document.removeEventListener('renameFlag', handleRenameEvent);
                    const renameBox = document.getElementById('renameBox');
                    renameBox.style.display = 'none';
                    setInputValue('');
                    setInitialClick(3);
                }
            }
        };
        document.addEventListener('click', closeRename);

        return () => {
            document.removeEventListener('click', closeRename);
        };
    });

    document.addEventListener('renameFlag', handleRenameEvent);

    return (
        <div id="renameBox" style={{ display: 'none' }} ref={renameRef}>
            <form action="" className="new-list-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Rename selected"
                    aria-label="Rename selected"
                />
                <button type="submit" className="btn-create" aria-label="Rename selected">
                    Confirm
                </button>
            </form>
            <button type="button" onClick={handleCancelButton} className="btn-cancel" aria-label="Cancel rename">
                Cancel
            </button>
        </div>
    );
}

export function RenameList({
    handleRenameList,
    selectedListId,
    selectedProjectId,
}) {
    const [inputValue, setInputValue] = useState('');

    //possibly add in some string appender that prints the correct ids

    const getUniqueDocId = (stringVal, intVal) => {
        const result = stringVal + intVal;
        return result;
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Updates name of selected project
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue === '') return;
        let newName = inputValue;
        let projectId = selectedProjectId;
        let listId = selectedListId;
        handleRenameList(newName, projectId, listId);//edit this to the new function (renamelist)
        document.removeEventListener(getUniqueDocId('listRename', listId), handleRenameEvent)
        const renameBox = document.getElementById(getUniqueDocId('renameListBox', listId)); //change this to something specific to list
        renameBox.style.display = 'none';
        setInputValue('');
        //setInitialClick(3);
    };

    //Displays renaming feature
    const handleRenameEvent = () => {
        let listId = selectedListId;
        const renameBoxList = document.getElementById(getUniqueDocId('renameListBox', listId));
        renameBoxList.style.display = 'block';
    };

    const handleCancelButton = () => {
        let listId = selectedListId;
        document.removeEventListener(getUniqueDocId('listRename', listId), handleRenameEvent);
        const renameBoxList = document.getElementById(getUniqueDocId('renameListBox', listId));
        renameBoxList.style.display = 'none';
        setInputValue('');
    };

    let listId = selectedListId;
    document.addEventListener(getUniqueDocId('listRename', listId), handleRenameEvent);
    const uniqueId = getUniqueDocId('renameListBox', listId);

    return (
        <div id={uniqueId} style={{ display: 'none' }}>
            <form action="" className="list-renamer" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Rename List"
                    aria-label="Rename List"
                />
                <button type="submit" className="btn-create" aria-label="Rename selected list">
                    Confirm
                </button>
                <button type="button" onClick={handleCancelButton} className="btn-cancel" aria-label="Cancel rename list">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export function RenameTask({
    selectedListId,
    selectedProjectId,
    selectedTaskId,
    handleRenameTask,
}) {
    const [inputValue, setInputValue] = useState('');

    //possibly add in some string appender that prints the correct ids

    const getUniqueDocId = (stringVal, intVal) => {
        const result = stringVal + intVal;
        return result;
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Updates name of selected project
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue === '') return;
        let newName = inputValue;
        let projectId = selectedProjectId;
        let listId = selectedListId;
        let taskId = selectedTaskId;
        handleRenameTask(newName, projectId, listId, taskId);//edit this to the new function (renamelist)
        document.removeEventListener(getUniqueDocId('taskRename', taskId), handleRenameEvent)
        const renameBox = document.getElementById(getUniqueDocId('renameTaskBox', taskId)); //change this to something specific to list
        renameBox.style.display = 'none';
        setInputValue('');
        //setInitialClick(3);
    };

    //Displays renaming feature
    const handleRenameEvent = () => {
        let taskId = selectedTaskId;
        const renameBoxTask = document.getElementById(getUniqueDocId('renameTaskBox', taskId));
        renameBoxTask.style.display = 'block';
    };

    const handleCancelButton = () => {
        let taskId = selectedTaskId;
        document.removeEventListener(getUniqueDocId('taskRename', taskId), handleRenameEvent);
        const renameBoxTask = document.getElementById(getUniqueDocId('renameTaskBox', taskId));
        renameBoxTask.style.display = 'none';
        setInputValue('');
    };

    let taskId = selectedTaskId;
    document.addEventListener(getUniqueDocId('taskRename', taskId), handleRenameEvent);
    const uniqueId = getUniqueDocId('renameTaskBox', taskId);


    return (
        <div id={uniqueId} style={{ display: 'none' }}>
            <form action="" className="task-renamer" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Rename Task"
                    aria-label="Rename Task"
                />
                <button type="submit" className="btn-create" aria-label="Rename selected task">
                    Confirm
                </button>
                <button type="button" onClick={handleCancelButton} className="btn-cancel" aria-label="Cancel rename task">
                    Cancel
                </button>
            </form>
        </div>
    );
}