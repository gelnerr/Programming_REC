import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskCard from './TaskCard';
import './CalendarStyles.css';

function Calendar({ tasks, setTasks }) {
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
          w="8px"
          h="8px"
          bg="blue.500"
          borderRadius="full"
          mx="auto"
          mt={1}
          boxShadow="0 0 4px rgba(66, 153, 225, 0.6)"
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

  return (
    <VStack spacing={6} align="stretch">
      {/* Calendar */}
      <Box
        className="calendar-container"
        bg="chakra-body-bg"
        borderRadius="lg"
        p={4}
      >
        <ReactCalendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          className="custom-calendar"
        />
      </Box>

      {/* Tasks for selected date */}
      <Box>
        <VStack align="start" spacing={1} mb={4}>
          <Heading size="md">Tasks for Selected Date</Heading>
          <Text fontSize="sm" color="gray.600">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </VStack>

        {tasksForSelectedDate.length === 0 ? (
          <VStack
            spacing={3}
            py={12}
            px={6}
            borderWidth="1px"
            borderRadius="lg"
            borderStyle="dashed"
            textAlign="center"
          >
            <Icon as={CheckCircleIcon} boxSize={10} color="green.400" />
            <Text color="gray.600" fontSize="lg">
              No tasks for this day
            </Text>
            <Text color="gray.500" fontSize="sm">
              Enjoy your free time! 🎉
            </Text>
          </VStack>
        ) : (
          <VStack spacing={4} align="stretch">
            {tasksForSelectedDate.map((task) => (
              <TaskCard key={task.id} task={task} setTasks={setTasks} />
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}

export default Calendar;
