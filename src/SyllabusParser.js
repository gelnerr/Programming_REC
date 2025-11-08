import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Textarea,
  VStack,
  HStack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function SyllabusParser({ setTasks, isOpen, onClose }) {
  const [text, setText] = useState('');
  const [parsedTasks, setParsedTasks] = useState([]);
  const [step, setStep] = useState(1);

  const handleParseText = () => {
    if (!text.trim()) {
      alert('Please enter some text to parse');
      return;
    }

    // Enhanced regex pattern to match various task types, weightage, and date formats
    const regex =
      /(Assignment|Lab|Quiz|Project|Midterm|Mid-term|Final\s*Exam|Test|Exam|Presentation|Deliverable|Report|Homework|HW)[\s\d:#-]*[:\s]*(.*?)(?:due|on|by|:|-)?\s*(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[\s.,]*(\d{1,2})(?:st|nd|rd|th)?/gi;

    const matches = [...text.matchAll(regex)];

    if (matches.length === 0) {
      alert('No tasks found. Please check your text format.');
      return;
    }

    // Helper to normalize month names
    const normalizeMonth = (month) => {
      const monthMap = {
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
        'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
        'September': 'Sep', 'Sept': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
      };
      return monthMap[month] || month;
    };

    // Helper to extract weightage from description
    const extractWeightage = (text) => {
      const weightageMatch = text.match(/(\d{1,3})%/);
      return weightageMatch ? parseInt(weightageMatch[1], 10) : 0;
    };

    // Create parsed task objects
    const tasks = matches.map((match, index) => {
      const taskType = match[1].trim(); // Assignment, Lab, Quiz, etc.
      const description = match[2].trim(); // Additional description
      const month = normalizeMonth(match[3]); // Month name
      const day = match[4]; // Day number

      // Extract weightage from the full match or description
      const fullMatch = match[0];
      const weightage = extractWeightage(fullMatch);

      // Build a meaningful title
      let title = taskType;
      if (description && description.length > 0 && description.length < 50) {
        // Only add description if it's not too long
        title = `${taskType} ${description}`;
      }
      // Clean up the title - remove weightage percentage and extra symbols
      title = title.replace(/\d+%/g, '').replace(/[:\-%]+$/, '').trim();

      return {
        tempId: index + 1,
        title: title || `${taskType} ${index + 1}`,
        month: month,
        day: day,
        priority: 'Medium',
        weightage: weightage,
        effort: 'Medium',
        category: '',
      };
    });

    setParsedTasks(tasks);
    setStep(2);
  };

  const handleRemoveTask = (tempId) => {
    setParsedTasks((prev) => prev.filter((task) => task.tempId !== tempId));
  };

  const handleTaskChange = (tempId, field, value) => {
    setParsedTasks((prev) =>
      prev.map((task) =>
        task.tempId === tempId ? { ...task, [field]: value } : task
      )
    );
  };

  const handleAddToCalendar = () => {
    // Convert month names to numbers
    const monthMap = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    // Convert parsed tasks to full task objects
    const today = new Date();
    const currentYear = today.getFullYear();

    const newTasks = parsedTasks.map((task) => {
      const monthNum = monthMap[task.month];
      const dayPadded = task.day.padStart(2, '0');

      // Smart year detection: if date has passed this year, use next year
      let year = currentYear;
      const taskDate = new Date(currentYear, parseInt(monthNum) - 1, parseInt(task.day));

      // If the task date is in the past, assume it's for next year
      if (taskDate < today) {
        year = currentYear + 1;
      }

      const dueDate = `${year}-${monthNum}-${dayPadded}`;

      return {
        id: new Date().getTime().toString() + '-' + task.tempId,
        title: task.title,
        dueDate: dueDate,
        dueTime: '23:59', // Default to end of day
        priority: task.priority,
        weightage: Number(task.weightage),
        effort: task.effort,
        category: task.category,
        scheduleType: 'School', // Default to School
      };
    });

    // Add all new tasks to the main tasks array
    setTasks((prevTasks) => [...prevTasks, ...newTasks]);

    // Show success message
    const taskCount = newTasks.length;
    const message = `Successfully added ${taskCount} task${taskCount > 1 ? 's' : ''}! Check the Calendar tab to see all your tasks.`;
    alert(message);

    // Reset and close
    setText('');
    setParsedTasks([]);
    setStep(1);
    onClose();
  };

  const handleClose = () => {
    // Reset state when closing
    setText('');
    setParsedTasks([]);
    setStep(1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {step === 1 ? 'Parse Syllabus' : 'Confirm Your Tasks'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 1 ? (
            // Step 1: Input text
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Paste your syllabus text below. We'll extract assignments, labs,
                quizzes, projects, and exams with their due dates.
              </Text>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: Assignment 1 is due on Nov 10&#10;Lab 2 due Nov 15&#10;Quiz 1 on Dec 1"
                rows={12}
              />
            </VStack>
          ) : (
            // Step 2: Confirm and edit parsed tasks
            <VStack spacing={4} align="stretch">
              {parsedTasks.length === 0 ? (
                <Text>No tasks to confirm.</Text>
              ) : (
                parsedTasks.map((task) => (
                  <Box
                    key={task.tempId}
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    bg="whiteAlpha.50"
                    _dark={{ bg: 'whiteAlpha.100' }}
                  >
                    <VStack spacing={3} align="stretch">
                      {/* Parsed Title and Date */}
                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold">{task.title}</Text>
                          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                            Parsed Date: {task.month} {task.day}
                          </Text>
                        </VStack>
                        <IconButton
                          icon={<DeleteIcon />}
                          onClick={() => handleRemoveTask(task.tempId)}
                          aria-label="Remove task"
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                        />
                      </HStack>

                      <Divider />

                      {/* Editable Fields */}
                      <HStack spacing={2}>
                        <FormControl>
                          <FormLabel fontSize="sm">Category</FormLabel>
                          <Input
                            size="sm"
                            value={task.category}
                            onChange={(e) =>
                              handleTaskChange(
                                task.tempId,
                                'category',
                                e.target.value
                              )
                            }
                            placeholder="e.g., ENPE 200"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel fontSize="sm">Priority</FormLabel>
                          <Select
                            size="sm"
                            value={task.priority}
                            onChange={(e) =>
                              handleTaskChange(
                                task.tempId,
                                'priority',
                                e.target.value
                              )
                            }
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </Select>
                        </FormControl>
                      </HStack>

                      <HStack spacing={2}>
                        <FormControl>
                          <FormLabel fontSize="sm">Weightage (%)</FormLabel>
                          <Input
                            size="sm"
                            type="number"
                            value={task.weightage}
                            onChange={(e) =>
                              handleTaskChange(
                                task.tempId,
                                'weightage',
                                e.target.value
                              )
                            }
                            min="0"
                            max="100"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel fontSize="sm">Effort</FormLabel>
                          <Select
                            size="sm"
                            value={task.effort}
                            onChange={(e) =>
                              handleTaskChange(task.tempId, 'effort', e.target.value)
                            }
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </Select>
                        </FormControl>
                      </HStack>
                    </VStack>
                  </Box>
                ))
              )}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          {step === 1 ? (
            <Button colorScheme="blue" onClick={handleParseText}>
              Parse Text
            </Button>
          ) : (
            <Button
              colorScheme="green"
              onClick={handleAddToCalendar}
              isDisabled={parsedTasks.length === 0}
            >
              Add to Calendar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SyllabusParser;
