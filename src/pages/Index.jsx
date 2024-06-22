import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Text, VStack, Textarea, Button, Box, Heading, Link } from "@chakra-ui/react";

const Index = () => {
  const [passage, setPassage] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchPassage();
  }, []);

  const fetchPassage = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setPassage(response.data.content);
    } catch (error) {
      console.error("Error fetching passage:", error);
      setPassage("The quick brown fox jumps over the lazy dog."); // Fallback passage
    }
  };

  const handleChange = (e) => {
    if (!startTime) {
      setStartTime(new Date());
    }
    setInput(e.target.value);

    if (e.target.value === passage) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000 / 60; // in minutes
    const wordCount = input.split(" ").length;
    setWpm(Math.round(wordCount / timeDiff));
  };

  const getHighlightedText = (text, input) => {
    const words = text.split(" ");
    const inputWords = input.split(" ");
    return words.map((word, index) => {
      let color = "black";
      if (index < inputWords.length) {
        color = word === inputWords[index] ? "green" : "red";
      }
      return (
        <span key={index} style={{ color }}>
          {word}{" "}
        </span>
      );
    });
  };

  const handleRestart = () => {
    fetchPassage();
    setInput("");
    setStartTime(null);
    setWpm(null);
    inputRef.current.focus();
  };

  return (
    <Container centerContent maxW="container.md" minH="100vh" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
      <VStack spacing={4} width="100%" flex="1">
        <Heading as="h1" size="xl">WPM Typing Game</Heading>
        <Text fontSize="lg">{getHighlightedText(passage, input)}</Text>
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
      <Footer />
    </Container>
  );
};

const Footer = () => (
  <Box as="footer" py={4} textAlign="center" width="100%" mt={8} borderTop="1px" borderColor="gray.200">
    <Text fontSize="sm">
      © {new Date().getFullYear()} WPM Typing Game. All rights reserved. | <Link href="https://example.com" isExternal>Privacy Policy</Link> | <Link href="https://example.com" isExternal>Terms of Service</Link>
    </Text>
  </Box>
);

export default Index;