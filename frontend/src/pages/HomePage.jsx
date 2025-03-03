import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBookStore } from "../../library/books";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const { fetchBooks, books } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  console.log(books);
  return (
    <Container maxW={"container.xl"} py={"12"}>
      <VStack>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient="linear(to-l, rgb(78, 215, 169), rgb(57, 185, 70) )"
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Books 📖
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </SimpleGrid>

        {books.length == 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Books Found 😖
            <Link to="/create">
              <Text
                as={"span"}
                color="rgb(57, 185, 70)"
                _hover={{ textDecoration: "underline" }}
              >
                Create Book
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
