import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Switch,
  Select,
  Button,
  Divider,
  useColorMode,
} from '@chakra-ui/react';

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack spacing={6} align="stretch">
      {/* Page Header */}
      <Heading size="lg">Settings</Heading>

      {/* Appearance */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={6}
        borderRadius="lg"
        shadow="sm"
      >
        <Heading size="md" mb={4}>
          Appearance
        </Heading>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Box>
              <Text fontWeight="medium">Dark Mode</Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Toggle dark mode theme
              </Text>
            </Box>
            <Switch
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              colorScheme="brand"
              size="lg"
            />
          </HStack>

          <Divider />

          <Box>
            <Text fontWeight="medium" mb={2}>
              Default View
            </Text>
            <Select defaultValue="overview">
              <option value="overview">Overview</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="calendar">Calendar</option>
            </Select>
          </Box>
        </VStack>
      </Box>

      {/* Notifications */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={6}
        borderRadius="lg"
        shadow="sm"
      >
        <Heading size="md" mb={4}>
          Notifications
        </Heading>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Box>
              <Text fontWeight="medium">Task Reminders</Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Get notified before deadlines
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" defaultChecked />
          </HStack>

          <Divider />

          <HStack justify="space-between">
            <Box>
              <Text fontWeight="medium">Daily Summary</Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Receive daily task summary
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" defaultChecked />
          </HStack>
        </VStack>
      </Box>

      {/* Data Management */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={6}
        borderRadius="lg"
        shadow="sm"
      >
        <Heading size="md" mb={4}>
          Data Management
        </Heading>
        <VStack spacing={4} align="stretch">
          <Button colorScheme="brand" variant="outline">
            Export All Tasks
          </Button>
          <Button colorScheme="red" variant="outline">
            Clear All Data
          </Button>
        </VStack>
      </Box>

      {/* About */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={6}
        borderRadius="lg"
        shadow="sm"
      >
        <Heading size="md" mb={4}>
          About
        </Heading>
        <VStack spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Version
            </Text>
            <Text fontWeight="medium">1.0.0</Text>
          </HStack>
          <HStack justify="space-between">
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Made with
            </Text>
            <Text fontWeight="medium">React & Chakra UI</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}

export default Settings;
