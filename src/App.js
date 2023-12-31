import {
  Center,
  Heading,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Discover from "./components/Discover";
import Library from "./components/Library";

export const API_URL = process.env.REACT_APP_API_URL;


function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [refreshData, setRefreshData] = useState(false);


  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((response) => response.json())
      .then((data) => {
        setAllBooks(data);
      });
  }, [refreshData]);

  const fetchData = () => {
    setRefreshData(!refreshData);
  };
  return (
    <ChakraProvider>
      <Center bg="black" color="white" padding={8}>
        <VStack spacing={7}>
          <Tabs variant="soft-rounded" colorScheme="red">
            <Center>
              <TabList>
                <Tab>
                  <Heading>Discover</Heading>
                </Tab>
                <Tab>
                  <Heading>Library</Heading>
                </Tab>
              </TabList>
            </Center>
            <TabPanels>
              <TabPanel>
                <Discover refreshData={fetchData} />
              </TabPanel>
              <TabPanel>
                <Library allBooks={allBooks} refreshData={fetchData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
