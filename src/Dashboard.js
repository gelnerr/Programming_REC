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
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
} from '@chakra-ui/react';
import { AddIcon, TimeIcon } from '@chakra-ui/icons';
import { MdLocalFireDepartment } from 'react-icons/md';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import SyllabusParser from './SyllabusParser';
import FocusMode from './FocusMode';

// Time-based motivational quotes
const getMotivationalQuote = () => {
  const hour = new Date().getHours();

  const quotes = {
    morning: [
      { text: "Good morning! Start strong today." },
      { text: "Rise and shine! You've got this!" },
      { text: "Every morning is a fresh start."}
    ],
    afternoon: [
      { text: "Keep pushing! You're halfway there."},
      { text: "Stay focused, the finish line is near."},
      { text: "You're doing great! Keep going." }
    ],
    evening: [
      { text: "Review and plan for tomorrow."},
      { text: "Reflect on today's progress."},
      { text: "Rest well, you've earned it."}
    ]
  };

  let timeOfDay;
  if (hour < 12) timeOfDay = 'morning';
  else if (hour < 18) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';

  const quoteArray = quotes[timeOfDay];
  return quoteArray[Math.floor(Math.random() * quoteArray.length)];
};

function Dashboard({ tasks, setTasks }) {
  const [sortBy, setSortBy] = useState('dueDate');
  const [viewMode, setViewMode] = useState('week'); // Default to 'This Week'
  const quote = useMemo(() => getMotivationalQuote(), []);

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

  const {
    isOpen: isFocusModeOpen,
    onOpen: onFocusModeOpen,
    onClose: onFocusModeClose,
  } = useDisclosure();

  // Filter and sort logic
  const getFilteredTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (viewMode === 'today') {
      const todayString = formatDateToYYYYMMDD(today);
      return tasks.filter((task) => task.dueDate === todayString);
    }

    if (viewMode === 'all') {
      return tasks; // Return all tasks without filtering
    }

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    sevenDaysFromNow.setHours(23, 59, 59, 999);

    const todayString = formatDateToYYYYMMDD(today);
    const sevenDaysString = formatDateToYYYYMMDD(sevenDaysFromNow);

    return tasks.filter((task) => {
      return task.dueDate >= todayString && task.dueDate <= sevenDaysString;
    });
  };

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
        return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'weightage':
        return sorted.sort((a, b) => b.weightage - a.weightage);
      default:
        return sorted;
    }
  };

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredTasks = getFilteredTasks();
  const sortedTasks = getSortedTasks(filteredTasks);

  // Separate incomplete and completed tasks
  const incompleteTasks = sortedTasks.filter((task) => !task.completed);
  const completedTasks = sortedTasks.filter((task) => task.completed);

  // Calculate stats
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0;

  const stats = {
    totalTasks: tasks.length,
    incompleteTasks: incompleteTasks.length,
    completedTasks: totalCompleted,
    completionRate: completionRate,
    streak: 5, // Placeholder
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Motivational Quote Card */}
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        p={6}
        borderRadius="xl"
        color="white"
        position="relative"
        overflow="hidden"
        shadow="lg"
      >
        <Box position="relative" zIndex={1}>
          <Heading size="md" mb={2}>Hello, Student!</Heading>
          <Text fontSize="lg" fontStyle="italic" opacity={0.95}>
            "{quote.text}"
          </Text>
        </Box>
        <Box
          position="absolute"
          top="-20px"
          right="-20px"
          fontSize="120px"
          opacity={0.1}
        >
          ✨
        </Box>
      </Box>

      {/* Quick Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <StatCard
          label="Incomplete"
          value={stats.incompleteTasks}
          icon={MdLocalFireDepartment}
          colorScheme="red"
        />
        <StatCard
          label="Completed"
          value={stats.completedTasks}
          icon={TimeIcon}
          colorScheme="green"
        />
        <StatCard
          label="Total Tasks"
          value={stats.totalTasks}
          icon={AddIcon}
          colorScheme="purple"
        />
        <StatCard
          label="Completion"
          value={`${stats.completionRate}%`}
          colorScheme="blue"
        />
      </SimpleGrid>

      {/* View Toggle Buttons */}
      <HStack spacing={3} justify="center">
        <Button
          size="md"
          colorScheme={viewMode === 'today' ? 'brand' : 'gray'}
          variant={viewMode === 'today' ? 'solid' : 'outline'}
          onClick={() => setViewMode('today')}
          borderRadius="full"
        >
          Today
        </Button>
        <Button
          size="md"
          colorScheme={viewMode === 'week' ? 'brand' : 'gray'}
          variant={viewMode === 'week' ? 'solid' : 'outline'}
          onClick={() => setViewMode('week')}
          borderRadius="full"
        >
          This Week
        </Button>
        <Button
          size="md"
          colorScheme={viewMode === 'all' ? 'brand' : 'gray'}
          variant={viewMode === 'all' ? 'solid' : 'outline'}
          onClick={() => setViewMode('all')}
          borderRadius="full"
        >
          All Tasks
        </Button>
      </HStack>

      {/* Focus Mode Section */}
      {incompleteTasks.length > 0 && (
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="2px"
          borderColor="brand.200"
          _dark={{ bg: 'gray.800', borderColor: 'brand.700' }}
        >
          <HStack justify="space-between" mb={3}>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" fontWeight="semibold" color="brand.600" _dark={{ color: 'brand.400' }}>
                FOCUS MODE
              </Text>
              <Heading size="sm">Next up: {incompleteTasks[0].title}</Heading>
            </VStack>
            <Button
              colorScheme="brand"
              size="sm"
              onClick={onFocusModeOpen}
            >
              Start Pomodoro
            </Button>
          </HStack>
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            Due {incompleteTasks[0].dueDate} at {incompleteTasks[0].dueTime}
          </Text>
        </Box>
      )}

      {/* Tasks Section */}
      {sortedTasks.length === 0 ? (
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
          <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} fontStyle="italic" maxW="md">
            "{quote.text}"
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
        <>
          <HStack spacing={4} mb={6} flexWrap="wrap" justify="space-between">
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

          {/* Incomplete Tasks Section */}
          {incompleteTasks.length > 0 && (
            <Box mb={8}>
              <HStack spacing={2} mb={4}>
                <Text fontSize="xl" fontWeight="bold">📝 Incomplete Tasks</Text>
                <Badge colorScheme="blue" fontSize="sm">{incompleteTasks.length}</Badge>
              </HStack>
              <VStack spacing={4} align="stretch">
                {incompleteTasks.map((task) => (
                  <TaskCard key={task.id} task={task} setTasks={setTasks} />
                ))}
              </VStack>
            </Box>
          )}

          {/* Completed Tasks Section */}
          {completedTasks.length > 0 && (
            <Box>
              <HStack spacing={2} mb={4}>
                <Text fontSize="xl" fontWeight="bold">✅ Completed Tasks</Text>
                <Badge colorScheme="green" fontSize="sm">{completedTasks.length}</Badge>
              </HStack>
              <VStack spacing={4} align="stretch">
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} setTasks={setTasks} />
                ))}
              </VStack>
            </Box>
          )}
        </>
      )}

      {/* Modals */}
      <TaskForm setTasks={setTasks} isOpen={isTaskFormOpen} onClose={onTaskFormClose} />
      <SyllabusParser setTasks={setTasks} isOpen={isParserOpen} onClose={onParserClose} />
      {incompleteTasks.length > 0 && (
        <FocusMode task={incompleteTasks[0]} isOpen={isFocusModeOpen} onClose={onFocusModeClose} />
      )}
    </VStack>
  );
}

// Quick Stat Card Component
function StatCard({ label, value, icon, colorScheme = 'brand' }) {
  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.800' }}
      p={4}
      borderRadius="lg"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
      cursor="pointer"
    >
      <Stat>
        <StatLabel fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
          {label}
        </StatLabel>
        <StatNumber fontSize="2xl" color={`${colorScheme}.600`} _dark={{ color: `${colorScheme}.400` }}>
          {value}
        </StatNumber>
      </Stat>
    </Box>
  );
}

export default Dashboard;
