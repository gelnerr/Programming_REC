import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import SyllabusParser from './SyllabusParser';

function Dashboard({ tasks, setTasks }) {
  const [sortBy, setSortBy] = useState('dueDate');

  // Disclosure hooks for modals
  const {
    isOpen: isTaskFormOpen,
    onOpen: onTaskFormOpen,
    onClose: onTaskFormClose,
  } = useDisclosure();

  const {
    isOpen: isParserOpen,
    onOpen: onParserOpen,
    onClose: onParserClose,
  } = useDisclosure();

  // Filter tasks: only show tasks due within the next 7 days
  const getFilteredTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    sevenDaysFromNow.setHours(23, 59, 59, 999);

    // Convert to YYYY-MM-DD format for comparison
    const todayString = formatDateToYYYYMMDD(today);
    const sevenDaysString = formatDateToYYYYMMDD(sevenDaysFromNow);

    return tasks.filter((task) => {
      return task.dueDate >= todayString && task.dueDate <= sevenDaysString;
    });
  };

  // Sort tasks based on sortBy state
  const getSortedTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];

    switch (sortBy) {
      case 'dueDate':
        return sorted.sort((a, b) => {
          const dateCompare = a.dueDate.localeCompare(b.dueDate);
          if (dateCompare !== 0) return dateCompare;
          return a.dueTime.localeCompare(b.dueTime);
        });

      case 'priority':
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sorted.sort((a, b) => {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

      case 'weightage':
        return sorted.sort((a, b) => b.weightage - a.weightage);

      default:
        return sorted;
    }
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredTasks = getFilteredTasks();
  const sortedTasks = getSortedTasks(filteredTasks);

  return (
    <Box>
      {/* Control Bar */}
      <HStack spacing={4} mb={6} flexWrap="wrap">
        <Button colorScheme="blue" onClick={onTaskFormOpen}>
          Add Task
        </Button>
        <Button colorScheme="green" onClick={onParserOpen}>
          Parse Syllabus
        </Button>
        <Select
          maxW="200px"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="weightage">Sort by Weightage</option>
        </Select>
      </HStack>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <Box
          textAlign="center"
          py={12}
          px={6}
          borderWidth="1px"
          borderRadius="lg"
          borderStyle="dashed"
        >
          <Text fontSize="lg" color="gray.600">
            All clear! Add a task or parse a syllabus to get started.
          </Text>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))}
        </VStack>
      )}

      {/* Modals */}
      <TaskForm
        setTasks={setTasks}
        isOpen={isTaskFormOpen}
        onClose={onTaskFormClose}
      />
      <SyllabusParser
        setTasks={setTasks}
        isOpen={isParserOpen}
        onClose={onParserClose}
      />
    </Box>
  );
}

export default Dashboard;
