import { Box, Button, FormLabel, Heading, HStack, Image, Input, Text, Textarea, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useState } from "react";
import emailjs from "emailjs-com";


function App() {
  const [complaintInfo, setComplaintInfo] = useState({
    title: "",
    lecturer: "",
    nature_of_complaint: "",
    submittedAt: new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  })

  const handleChange = (e) => {
    setComplaintInfo({ ...complaintInfo, [e.target.name]: e.target.value })
  }

  const SERVICE_ID = ""
  const TEMPLATE_ID = ""
  const PUBLIC_KEY = ""

  const handleSubmit = () => {
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        title: complaintInfo.title,
        lecturer: complaintInfo.lecturer,
        nature_of_complaint: complaintInfo.nature_of_complaint,
        submittedAt: complaintInfo.submittedAt
      },
      PUBLIC_KEY
    );

    setComplaintInfo({
      title: "",
      lecturer: "",
      nature_of_complaint: "",
    });

    alert("Your complaint has been emailed to the management.");
  }

  const formWidth = useBreakpointValue({ base: '100%', md: '500px' });
  return (
    <Box
      w="100%"
      minH="100vh"
      bgGradient="linear(to-r, red.300, white)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box
        as="form"
        bg="white"
        boxShadow="2xl"
        borderRadius="xl"
        p={6}
        w={formWidth}
        maxW="500px"
      >
        <VStack spacing={5}>
          <Image src="/Lincoln.png" alt="lcn logo" w="100%" maxW="350px" />

          <Heading size="lg" color="red.600" textAlign="center">
            Student Complaints Portal
          </Heading>

          <Text fontSize="sm" color="gray.600" textAlign="center">
            Please complete the form below for your complaints.
          </Text>

          <VStack spacing={4} w="full">
            <Box w="full">
              <FormLabel>Title</FormLabel>
              <Input
                variant="filled"
                onChange={handleChange}
                required
                name="title"
                value={complaintInfo.title}
                placeholder="Course Registration Problems..."
              />
            </Box>

            <Box w="full">
              <HStack spacing={1}>
                <FormLabel m={0}>Lecturer's Name</FormLabel>
                <Text fontSize="sm" color="gray.500">
                  (Optional)
                </Text>
              </HStack>
              <Input
                variant="filled"
                onChange={handleChange}
                name="lecturer"
                value={complaintInfo.lecturer}
                placeholder="Dr. ...."
              />
            </Box>

            <Box w="full">
              <FormLabel>Nature of Complaint</FormLabel>
              <Textarea
                variant="filled"
                onChange={handleChange}
                required
                name="nature_of_complaint"
                value={complaintInfo.nature_of_complaint}
                placeholder="I have an issue ........"
              />
            </Box>
          </VStack>

          <Button
            variant="solid"
            w="full"
            colorScheme="red"
            onClick={handleSubmit}
            size="lg"
          >
            Submit Complaint
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
