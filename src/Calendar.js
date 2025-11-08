import React, { useState } from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskCard from './TaskCard';
import './CalendarStyles.css';

function Calendar({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper function to format date to YYYY-MM-DD
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check if a date has tasks
  const dateHasTasks = (date) => {
    const dateString = formatDateToYYYYMMDD(date);
    return tasks.some((task) => task.dueDate === dateString);
  };

  // Tile content to show dots for dates with tasks
  const tileContent = ({ date, view }) => {
    if (view === 'month' && dateHasTasks(date)) {
      return (
        <Box
          w="6px"
          h="6px"
          bg="blue.500"
          borderRadius="full"
          mx="auto"
          mt={1}
        />
      );
    }
    return null;
  };

  // Get tasks for the selected date
  const getTasksForSelectedDate = () => {
    const selectedDateString = formatDateToYYYYMMDD(selectedDate);
    return tasks.filter((task) => task.dueDate === selectedDateString);
  };

  const tasksForSelectedDate = getTasksForSelectedDate();

  // Dummy setTasks function for TaskCard (since we can't modify from Calendar view)
  // In a real app, you might want to pass the actual setTasks from App.js
  const handleSetTasks = () => {
    console.warn('Task modification not supported in Calendar view');
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Calendar */}
      <Box className="calendar-container">
        <ReactCalendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          className="custom-calendar"
        />
      </Box>

      {/* Tasks for selected date */}
      <Box>
        <Heading size="md" mb={4}>
          Tasks for {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Heading>

        {tasksForSelectedDate.length === 0 ? (
          <Box
            textAlign="center"
            py={8}
            px={6}
            borderWidth="1px"
            borderRadius="lg"
            borderStyle="dashed"
          >
            <Text color="gray.600">No tasks for this day</Text>
          </Box>
        ) : (
          <VStack spacing={4} align="stretch">
            {tasksForSelectedDate.map((task) => (
              <TaskCard key={task.id} task={task} setTasks={handleSetTasks} />
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}

export default Calendar;
