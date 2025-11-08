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
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';

function TaskForm({ setTasks, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    priority: 'Medium',
    weightage: 0,
    effort: 'Medium',
    category: '',
    scheduleType: 'School',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title || !formData.dueDate || !formData.dueTime) {
      alert('Please fill in all required fields (Title, Due Date, Due Time)');
      return;
    }

    // Create new task with unique ID
    const newTask = {
      ...formData,
      id: new Date().getTime().toString(),
      weightage: Number(formData.weightage),
      completed: false,
    };

    // Add to tasks array
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Reset form and close modal
    setFormData({
      title: '',
      dueDate: '',
      dueTime: '',
      priority: 'Medium',
      weightage: 0,
      effort: 'Medium',
      category: '',
      scheduleType: 'School',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {/* Title */}
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., ENPE 200 Lab 3"
              />
            </FormControl>

            {/* Due Date */}
            <FormControl isRequired>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </FormControl>

            {/* Due Time */}
            <FormControl isRequired>
              <FormLabel>Due Time</FormLabel>
              <Input
                name="dueTime"
                type="time"
                value={formData.dueTime}
                onChange={handleChange}
              />
            </FormControl>

            {/* Course Name */}
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., ENSE 354"
              />
            </FormControl>

            {/* Priority */}
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>

            {/* Weightage */}
            <FormControl>
              <FormLabel>Weightage (%)</FormLabel>
              <Input
                name="weightage"
                type="number"
                value={formData.weightage}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormControl>

            {/* Effort */}
            <FormControl>
              <FormLabel>Effort</FormLabel>
              <Select name="effort" value={formData.effort} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>

            {/* Schedule Type */}
            <FormControl>
              <FormLabel>Schedule Type</FormLabel>
              <Select
                name="scheduleType"
                value={formData.scheduleType}
                onChange={handleChange}
              >
                <option value="School">School</option>
                <option value="Work">Work</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskForm;
