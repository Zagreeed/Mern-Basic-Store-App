import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useBookStore } from "../../library/books";

const CreatePage = () => {
  const toast = useToast();

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    author: "",
    image: "",
  });

  const { createBook, books } = useBookStore();

  const handleAddBook = async () => {
    const { success, message } = await createBook(newBook);

    toast({
      description: message,
      status: success ? "success" : "error",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Book
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Title"
              name="title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: e.target.value })
              }
            />
            <Input
              placeholder="Author"
              name="author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <Input
              placeholder="Image"
              name="image"
              value={newBook.image}
              onChange={(e) =>
                setNewBook({ ...newBook, image: e.target.value })
              }
            />
            <Button w={"full"} colorScheme="green" onClick={handleAddBook}>
              Add new Book
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
