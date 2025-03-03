import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Box,
  useToast,
  Input,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { VscColorMode } from "react-icons/vsc";
import { useBookStore } from "../../library/books";
import React, { useState } from "react";

// rgb(78, 215, 169), rgb(57, 185, 70)

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books, createBook } = useBookStore();
  const textColor = useColorModeValue("#103C1F", "#8ED968");

  const toast = useToast();

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    author: "",
    image: "",
  });

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
    <Container maxW={"1140px"} px={"4"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          smm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, rgb(78, 215, 169), rgb(57, 185, 70) )"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          textTransform={"uppercase"}
          textAlign={"center"}
          fontWeight="extrabold"
        >
          <Link to={"/"}>BOOK Library</Link>
        </Text>

        <HStack>
          <Button bg={useColorModeValue("#8ED968", "#103C1F")}>
            <IoAddCircle onClick={onOpen} fontSize={"23"} />
          </Button>

          <Button
            bg={useColorModeValue("#8ED968", "#103C1F")}
            onClick={toggleColorMode}
          >
            <VscColorMode />
          </Button>
        </HStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("#8ED968", "#103C1F")}>
          <ModalHeader fontWeight={"bold"}>Add Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8}>
              <Box
                w={"full"}
                bg={useColorModeValue("#8ED968", "#103C1F")}
                p={5}
              >
                <VStack spacing={4}>
                  <Input
                    placeholder="Title"
                    name="title"
                    color={textColor}
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Price"
                    color={textColor}
                    name="price"
                    value={newBook.price}
                    onChange={(e) =>
                      setNewBook({ ...newBook, price: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Author"
                    name="author"
                    color={textColor}
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook({ ...newBook, author: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Image"
                    name="image"
                    value={newBook.image}
                    color={textColor}
                    onChange={(e) =>
                      setNewBook({ ...newBook, image: e.target.value })
                    }
                  />
                </VStack>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleAddBook} colorScheme="green" mr={3}>
              Add Book
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default NavBar;
