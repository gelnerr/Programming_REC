import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  IconButton,
  Text,
  useColorMode,
  Icon,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  extendTheme,
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
  CalendarIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import {
  MdDashboard,
  MdToday,
  MdDateRange,
  MdInsertChart,
  MdSettings
} from 'react-icons/md';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import Analytics from './Analytics';
import Settings from './Settings';

// Custom theme with modern color palette
const theme = extendTheme({
  colors: {
    brand: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
});

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('studentPlannerTasks');
    if (storedTasks) {
      try {
        return JSON.parse(storedTasks);
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
        return [];
      }
    }
    return [];
  });

  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    localStorage.setItem('studentPlannerTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ChakraProvider theme={theme}>
      <Flex h="100vh" overflow="hidden">
        {/* Sidebar */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Main Content */}
        <Flex flex="1" direction="column" overflow="hidden">
          {/* Header */}
          <Header />

          {/* Content Area */}
          <Box flex="1" overflow="auto" bg="gray.50" _dark={{ bg: 'gray.900' }}>
            <Box maxW="1400px" mx="auto" p={6}>
              {activeView === 'overview' && <Dashboard tasks={tasks} setTasks={setTasks} />}
              {activeView === 'today' && <Dashboard tasks={tasks} setTasks={setTasks} viewMode="today" />}
              {activeView === 'week' && <Dashboard tasks={tasks} setTasks={setTasks} viewMode="week" />}
              {activeView === 'calendar' && <Calendar tasks={tasks} setTasks={setTasks} />}
              {activeView === 'analytics' && <Analytics tasks={tasks} />}
              {activeView === 'settings' && <Settings />}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

// Sidebar Component
function Sidebar({ activeView, setActiveView }) {
  const { colorMode } = useColorMode();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: MdDashboard },
    { id: 'today', label: 'Today', icon: MdToday },
    { id: 'week', label: 'This Week', icon: TimeIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'analytics', label: 'Analytics', icon: MdInsertChart },
    { id: 'settings', label: 'Settings', icon: MdSettings },
  ];

  return (
    <Box
      w="240px"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      h="100vh"
      overflow="auto"
    >
      <VStack spacing={1} align="stretch" p={4}>
        {/* Logo */}
        <HStack spacing={3} mb={6} px={2}>
          <Text fontSize="24px">🎓</Text>
          <Heading size="md" bgGradient="linear(to-r, brand.500, purple.500)" bgClip="text">
            Syllabyte
          </Heading>
        </HStack>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <HStack
            key={item.id}
            spacing={3}
            px={4}
            py={3}
            borderRadius="lg"
            cursor="pointer"
            bg={activeView === item.id ? 'brand.50' : 'transparent'}
            color={activeView === item.id ? 'brand.600' : 'gray.600'}
            _dark={{
              bg: activeView === item.id ? 'brand.900' : 'transparent',
              color: activeView === item.id ? 'brand.400' : 'gray.400',
            }}
            _hover={{
              bg: activeView === item.id ? 'brand.50' : 'gray.100',
              _dark: {
                bg: activeView === item.id ? 'brand.900' : 'gray.700',
              },
            }}
            transition="all 0.2s"
            onClick={() => setActiveView(item.id)}
          >
            <Icon as={item.icon} boxSize={5} />
            <Text fontWeight={activeView === item.id ? 'semibold' : 'medium'} fontSize="sm">
              {item.label}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

// Header Component
function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      px={6}
      py={4}
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      _dark={{ borderColor: 'gray.700', bg: 'gray.800' }}
      align="center"
      justify="space-between"
    >
      {/* Search */}
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search tasks..."
          variant="filled"
          bg="gray.100"
          _dark={{ bg: 'gray.700' }}
          border="none"
          _hover={{ bg: 'gray.200', _dark: { bg: 'gray.600' } }}
          _focus={{ bg: 'white', _dark: { bg: 'gray.900' }, borderColor: 'brand.500' }}
        />
      </InputGroup>

      {/* Right Section */}
      <HStack spacing={3}>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
          variant="ghost"
          fontSize="lg"
        />
        <Avatar size="sm" name="Student" bg="brand.500" />
      </HStack>
    </Flex>
  );
}

export default App;
