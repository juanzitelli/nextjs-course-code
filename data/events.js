export const getAllEvents = async () => {
  const response = await fetch(
    "https://maximilian-next-course-default-rtdb.firebaseio.com/0/events.json"
  );
  const eventsObjectToArray = (obj) => Object.keys(obj).map((key) => obj[key]);

  const json = await response.json();

  const events = eventsObjectToArray(json);

  return events;
};

export const getFeaturedEvents = async () => {
  return (await getAllEvents()).filter((event) => event.isFeatured);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  let filteredEvents = (await getAllEvents()).filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const getEventById = async (id) => {
  return (await getAllEvents()).find((event) => event.id === id);
};
