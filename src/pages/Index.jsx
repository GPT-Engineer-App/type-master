import React, { useState, useEffect, useRef } from "react";
import { Container, Text, VStack, Textarea, Button, Box, Heading } from "@chakra-ui/react";

const passages = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "The only thing we have to fear is fear itself."
];

const Index = () => {
  const [passage, setPassage] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setPassage(passages[Math.floor(Math.random() * passages.length)]);
  }, []);

  const handleChange = (e) => {
    if (!startTime) {
      setStartTime(new Date());
    }
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000 / 60; // in minutes
    const wordCount = input.split(" ").length;
    setWpm(Math.round(wordCount / timeDiff));
  };

  const handleRestart = () => {
    setPassage(passages[Math.floor(Math.random() * passages.length)]);
    setInput("");
    setStartTime(null);
    setWpm(null);
    inputRef.current.focus();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">WPM Typing Game</Heading>
        <Text fontSize="lg">{passage}</Text>
        <Textarea
          value={input}
          onChange={handleChange}
          placeholder="Start typing here..."
          size="md"
          ref={inputRef}
          width="100%"
        />
        <Button onClick={handleSubmit} colorScheme="teal" size="md">Submit</Button>
        {wpm !== null && (
          <Box>
            <Text fontSize="2xl">Your WPM: {wpm}</Text>
            <Button onClick={handleRestart} colorScheme="teal" size="md" mt={4}>Restart</Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;