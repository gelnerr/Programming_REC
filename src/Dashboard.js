import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Select,
  Text,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import SyllabusParser from './SyllabusParser';

// Motivational quotes for students
const MOTIVATIONAL_QUOTES = [
  "The secret to getting ahead is getting started.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Your only limit is you.",
  "Don't watch the clock; do what it does. Keep going.",
  "The expert in anything was once a beginner.",
  "Study while others are sleeping; work while others are loafing.",
  "The future depends on what you do today.",
  "Don't stress. Do your best. Forget the rest.",
];

function Dashboard({ tasks, setTasks }) {
  const [sortBy, setSortBy] = useState('dueDate');

  // Get a random motivational quote (memoized so it doesn't change on every render)
  const randomQuote = useMemo(
    () => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)],
    []
  );

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

  // Split tasks into "Due Today" and "Due This Week"
  const today = new Date();
  const todayString = formatDateToYYYYMMDD(today);

  const dueToday = sortedTasks.filter((task) => task.dueDate === todayString);
  const dueThisWeek = sortedTasks.filter((task) => task.dueDate > todayString);

  return (
    <Box>
      {/* Task List or Empty State */}
      {sortedTasks.length === 0 ? (
        // Empty State - Welcoming and Action-Oriented
        <VStack
          spacing={6}
          py={16}
          px={8}
          textAlign="center"
          borderWidth="1px"
          borderRadius="lg"
          borderStyle="dashed"
        >
          <Heading size="lg">Welcome! ☀️</Heading>
          <Text fontSize="lg" color="gray.600" fontStyle="italic" maxW="md">
            "{randomQuote}"
          </Text>

          <VStack spacing={4} mt={4} w="full" maxW="md">
            <Button
              size="lg"
              colorScheme="green"
              onClick={onParserOpen}
              w="full"
              leftIcon={<span style={{ fontSize: '1.2em' }}>✨</span>}
            >
              Parse My Syllabus
            </Button>
            <Button
              size="md"
              variant="outline"
              colorScheme="blue"
              onClick={onTaskFormOpen}
              w="full"
              leftIcon={<AddIcon />}
            >
              Add a Single Task
            </Button>
          </VStack>
        </VStack>
      ) : (
        // Full State - Tasks Organized by Due Date
        <>
          {/* Control Bar - Only show when there are tasks */}
          <HStack spacing={4} mb={6} flexWrap="wrap" justify="flex-end">
            <HStack>
              <Button size="sm" colorScheme="green" onClick={onParserOpen}>
                Parse Syllabus
              </Button>
              <Button size="sm" colorScheme="blue" onClick={onTaskFormOpen}>
                Add Task
              </Button>
            </HStack>
            <Select
              maxW="200px"
              size="sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="weightage">Sort by Weightage</option>
            </Select>
          </HStack>

          {/* Due Today Section */}
          {dueToday.length > 0 && (
            <Box mb={8}>
              <Heading size="md" mb={4}>
                🔥 Due Today
              </Heading>
              <VStack spacing={4} align="stretch">
                {dueToday.map((task) => (
                  <TaskCard key={task.id} task={task} setTasks={setTasks} />
                ))}
              </VStack>
            </Box>
          )}

          {/* Due This Week Section */}
          {dueThisWeek.length > 0 && (
            <Box>
              <Heading size="md" mb={4}>
                🗓️ Due This Week
              </Heading>
              <VStack spacing={4} align="stretch">
                {dueThisWeek.map((task) => (
                  <TaskCard key={task.id} task={task} setTasks={setTasks} />
                ))}
              </VStack>
            </Box>
          )}
        </>
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
