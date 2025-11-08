import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  Progress,
  Box,
  Icon,
} from '@chakra-ui/react';
import { MdPlayArrow, MdPause, MdRefresh } from 'react-icons/md';

function FocusMode({ task, isOpen, onClose }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus', 'break'

  const totalSeconds = mode === 'focus' ? 25 * 60 : 5 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  useEffect(() => {
    let interval = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            if (mode === 'focus') {
              alert('Focus session complete! Time for a break.');
            } else {
              alert('Break complete! Ready to focus again.');
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('focus');
      setMinutes(25);
    }
    setSeconds(0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>Focus Mode - Pomodoro Timer</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6}>
            {/* Task Info */}
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Working on:
              </Text>
              <Heading size="md">{task?.title || 'No task selected'}</Heading>
            </Box>

            {/* Mode Toggle */}
            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme={mode === 'focus' ? 'brand' : 'gray'}
                onClick={() => {
                  if (mode !== 'focus') switchMode();
                }}
              >
                Focus (25min)
              </Button>
              <Button
                size="sm"
                colorScheme={mode === 'break' ? 'green' : 'gray'}
                onClick={() => {
                  if (mode !== 'break') switchMode();
                }}
              >
                Break (5min)
              </Button>
            </HStack>

            {/* Timer Display */}
            <Box textAlign="center" py={8}>
              <Text fontSize="6xl" fontWeight="bold" fontFamily="mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </Text>
              <Progress
                value={progress}
                size="sm"
                colorScheme={mode === 'focus' ? 'brand' : 'green'}
                borderRadius="full"
                mt={4}
              />
            </Box>

            {/* Controls */}
            <HStack spacing={4}>
              <Button
                colorScheme={mode === 'focus' ? 'brand' : 'green'}
                size="lg"
                onClick={toggle}
                leftIcon={<Icon as={isActive ? MdPause : MdPlayArrow} />}
              >
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={reset}
                leftIcon={<Icon as={MdRefresh} />}
              >
                Reset
              </Button>
            </HStack>

            {/* Tips */}
            <Box
              bg="gray.50"
              _dark={{ bg: 'gray.700' }}
              p={4}
              borderRadius="md"
              w="full"
            >
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                💡 Pomodoro Tips:
              </Text>
              <VStack align="start" spacing={1}>
                <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                  • Eliminate all distractions
                </Text>
                <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                  • Focus on one task at a time
                </Text>
                <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                  • Take breaks seriously
                </Text>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FocusMode;
