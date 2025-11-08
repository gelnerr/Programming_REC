import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  HStack,
  Heading,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  Container,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Dashboard from './Dashboard';
import Calendar from './Calendar';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load initial state from localStorage
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

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('studentPlannerTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ChakraProvider>
      <Box minH="100vh" py={8}>
        <Container maxW="container.xl">
          {/* Header */}
          <HStack justify="space-between" mb={8}>
            <Heading size="xl">Student Planner</Heading>
            <ColorModeToggle />
          </HStack>

          {/* Tabs */}
          <Tabs colorScheme="blue" variant="enclosed">
            <TabList>
              <Tab>Dashboard</Tab>
              <Tab>Calendar</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Dashboard tasks={tasks} setTasks={setTasks} />
              </TabPanel>
              <TabPanel>
                <Calendar tasks={tasks} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

// Color mode toggle component
function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      variant="ghost"
      fontSize="xl"
    />
  );
}

export default App;
