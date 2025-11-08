import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Heading,
  IconButton,
  Badge,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function TaskCard({ task, setTasks }) {
  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  // Priority color scheme
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      _hover={{ shadow: 'lg' }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={3}>
        {/* Title and Delete Button */}
        <HStack justify="space-between">
          <Heading size="md">{task.title}</Heading>
          <IconButton
            icon={<DeleteIcon />}
            onClick={handleDelete}
            aria-label="Delete task"
            colorScheme="red"
            variant="ghost"
            size="sm"
          />
        </HStack>

        {/* Category and Schedule Type */}
        <HStack spacing={2}>
          {task.category && (
            <Text fontSize="sm" color="gray.600">
              {task.category}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500">
            • {task.scheduleType}
          </Text>
        </HStack>

        {/* Due Date and Time */}
        <Text fontSize="sm" fontWeight="medium">
          Due: {task.dueDate} at {task.dueTime}
        </Text>

        {/* Badges for Priority, Effort, and Weightage */}
        <HStack spacing={2}>
          <Badge colorScheme={getPriorityColor(task.priority)}>
            Priority: {task.priority}
          </Badge>
          <Badge colorScheme="purple">Effort: {task.effort}</Badge>
          <Badge colorScheme="blue">Weightage: {task.weightage}%</Badge>
        </HStack>
      </VStack>
    </Box>
  );
}

export default TaskCard;
