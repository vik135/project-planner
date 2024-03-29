import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Calendar({ projectsData }) {
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const transformDataToEvents = () => {
      let events = [];
      projectsData.forEach((project) => {
        project.lists.forEach((list) => {
          list.tasks.forEach((task) => {
            if (task.attributes.dueDate) {
              const event = {
                id: task.id,
                title: task.name,
                start: new Date(task.attributes.dueDate),
                end: new Date(task.attributes.dueDate),
                project: project.name,
                list: list.name,
                task: task,
                priority: task.attributes.priority,
              };
              events.push(event);
            }
          });
        });
      });
      return events;
    };

    const events = transformDataToEvents();

    let filtered = [...events];
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.list.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter((event) => event.priority === selectedPriority);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, selectedPriority, projectsData]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    let priorityColor = '';
    let textColor = '';
    switch (event.priority) {
      case 'high':
        priorityColor = '#FFE2DD';
        textColor = '#5D1715';
        break;
      case 'medium':
        priorityColor = '#FDECC8';
        textColor = '#56422E';
        break;
      case 'low':
        priorityColor = '#DBEDDB';
        textColor = '#1C3829';
        break;
      default:
        priorityColor = '#D3E5EF';
        textColor = '#183347';
        break;
    }

    const style = {
      backgroundColor: priorityColor,
      color: textColor,
      fontFamily: 'Nunito, sans-serif',
      paddingLeft: '14px',
    };
    return {
      style: style,
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    console.log('Clicked event:', event);
  };

  const handlePriorityChange = (selectedPriority) => {
    setSelectedPriority(selectedPriority);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null); // Close the popup by resetting selected event to null
  };

  return (
    <div className="calendar-page-container">
      <div style={{ marginBottom: '20px' }}>
        <label>
          Filter by Priority:{' '}
          <select
            value={selectedPriority}
            onChange={(e) => handlePriorityChange(e.target.value)}
            style={{ marginLeft: '5px' }}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Search Tasks:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ height: 500 }}>
        <BigCalendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
          toolbar={[]}
        />
      </div>
      {selectedEvent && (
        <div className="calendar-popup">
          <div className="popup-content">
            <h2>Task Details</h2>
            <p>Project: {selectedEvent.project}</p>
            <p>List: {selectedEvent.list}</p>
            <p>Task: {selectedEvent.title}</p>
            <button className="calendar-close-popup-btn" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
