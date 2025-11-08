import React, { useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';

function Analytics({ tasks }) {
  // Calculate analytics
  const analytics = useMemo(() => {
    const now = new Date();
    const total = tasks.length;
    const completed = 0; // We'll track this later
    const pending = total - completed;

    // Tasks by priority
    const high = tasks.filter((t) => t.priority === 'High').length;
    const medium = tasks.filter((t) => t.priority === 'Medium').length;
    const low = tasks.filter((t) => t.priority === 'Low').length;

    // Tasks this week
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const thisWeek = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= weekStart && taskDate <= weekEnd;
    }).length;

    // Average weightage
    const avgWeightage = total > 0
      ? (tasks.reduce((sum, t) => sum + (t.weightage || 0), 0) / total).toFixed(1)
      : 0;

    return {
      total,
      completed,
      pending,
      high,
      medium,
      low,
      thisWeek,
      avgWeightage,
      completionRate: total > 0 ? ((completed / total) * 100).toFixed(0) : 0,
    };
  }, [tasks]);

  return (
    <VStack spacing={6} align="stretch">
      {/* Page Header */}
      <Heading size="lg">Analytics & Insights</Heading>

      {/* Quick Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatCard
          label="Total Tasks"
          value={analytics.total}
          helpText="All time"
          colorScheme="brand"
        />
        <StatCard
          label="This Week"
          value={analytics.thisWeek}
          helpText="Next 7 days"
          colorScheme="purple"
        />
        <StatCard
          label="Completion Rate"
          value={`${analytics.completionRate}%`}
          helpText={`${analytics.completed}/${analytics.total} completed`}
          colorScheme="green"
        />
        <StatCard
          label="Avg Weightage"
          value={`${analytics.avgWeightage}%`}
          helpText="Per task"
          colorScheme="orange"
        />
      </SimpleGrid>

      {/* Priority Breakdown */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={6}
        borderRadius="lg"
        shadow="sm"
      >
        <Heading size="md" mb={4}>
          Priority Distribution
        </Heading>
        <VStack spacing={4} align="stretch">
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">
                High Priority
              </Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                {analytics.high} tasks
              </Text>
            </HStack>
            <Progress
              value={(analytics.high / analytics.total) * 100}
              colorScheme="red"
              size="sm"
              borderRadius="full"
            />
          </Box>

          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">
                Medium Priority
              </Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                {analytics.medium} tasks
              </Text>
            </HStack>
            <Progress
              value={(analytics.medium / analytics.total) * 100}
              colorScheme="yellow"
              size="sm"
              borderRadius="full"
            />
          </Box>

          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">
                Low Priority
              </Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                {analytics.low} tasks
              </Text>
            </HStack>
            <Progress
              value={(analytics.low / analytics.total) * 100}
              colorScheme="green"
              size="sm"
              borderRadius="full"
            />
          </Box>
        </VStack>
      </Box>

      {/* Productivity Streak */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={6}
        borderRadius="lg"
        shadow="sm"
      >
        <Heading size="md" mb={4}>
          Productivity Streak
        </Heading>
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">
            🔥 5
          </Text>
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            Days organized in a row!
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}

// Stat Card Component
function StatCard({ label, value, helpText, colorScheme }) {
  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.800' }}
      p={6}
      borderRadius="lg"
      shadow="sm"
      borderTop="4px"
      borderColor={`${colorScheme}.500`}
    >
      <Stat>
        <StatLabel color="gray.600" _dark={{ color: 'gray.400' }}>
          {label}
        </StatLabel>
        <StatNumber fontSize="3xl" color={`${colorScheme}.600`}>
          {value}
        </StatNumber>
        <StatHelpText color="gray.500" _dark={{ color: 'gray.500' }}>
          {helpText}
        </StatHelpText>
      </Stat>
    </Box>
  );
}

export default Analytics;
