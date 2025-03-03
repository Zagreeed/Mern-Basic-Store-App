import {
  Box,
  Image,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useBookStore } from "../../library/books";

const BookCard = ({ book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const textColor = useColorModeValue("#103C1F", "#8ED968");
  const { deleteBook } = useBookStore();

  const { updateBook } = useBookStore();

  const [updatedBook, setUpdatedBook] = useState(book);

  const handleDeleteBook = async (pid) => {
    const { message, success } = await deleteBook(pid);

    toast({
      description: message,
      status: success ? "success" : "error",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  const handleUpdateBook = async (pId, updatedBook) => {
    const { success, message } = await updateBook(pId, updatedBook);

    console.log("UPDATE BOOK?: " + success + " " + message);

    toast({
      description: message,
      status: success ? "success" : "error",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box
      shadow="lg"
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={book.image}
        alt={book.title}
        h={48}
        w={"full"}
        objectFit={"contain"}
      />
      <Box p={4}>
        <Heading as={"h3"} color={textColor} size={"md"} mb={2}>
          {book.title}
        </Heading>

        <Text fontWeight="bold" fontSize="m" color={" rgb(57, 185, 70)"} mb={4}>
          Author: {book.author}
        </Text>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {book.price}
        </Text>

        <HStack>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteBook(book._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>Update Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8}>
              <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={5}>
                <VStack spacing={4}>
                  <Input
                    placeholder="Title"
                    name="title"
                    value={updatedBook.title}
                    onChange={(e) =>
                      setUpdatedBook({ ...updatedBook, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    value={updatedBook.price}
                    onChange={(e) =>
                      setUpdatedBook({ ...updatedBook, price: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Author"
                    name="author"
                    value={updatedBook.author}
                    onChange={(e) =>
                      setUpdatedBook({ ...updatedBook, author: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Image"
                    name="image"
                    value={updatedBook.image}
                    onChange={(e) =>
                      setUpdatedBook({ ...updatedBook, image: e.target.value })
                    }
                  />
                </VStack>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleUpdateBook(book._id, updatedBook)}
              colorScheme="blue"
              mr={3}
            >
              Update
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookCard;
