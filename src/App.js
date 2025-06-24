import {
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import emailjs from "emailjs-com";

function App() {
  const [complaintInfo, setComplaintInfo] = useState({
    title: "",
    lecturer: "",
    nature_of_complaint: "",
  });

  const handleChange = (e) => {
    setComplaintInfo({ ...complaintInfo, [e.target.name]: e.target.value });
  };

  const SERVICE_ID = "service_9nc5cgg";
  const TEMPLATE_ID = "template_d0loof6";
  const PUBLIC_KEY = "ocQ2cFR_6q4W2eKVv";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic manual validation
    if (!complaintInfo.title.trim() || !complaintInfo.nature_of_complaint.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const submittedAt = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        title: complaintInfo.title,
        lecturer: complaintInfo.lecturer || "None",
        nature_of_complaint: complaintInfo.nature_of_complaint,
        submittedAt,
      },
      PUBLIC_KEY
    );

    setComplaintInfo({
      title: "",
      lecturer: "",
      nature_of_complaint: "",
    });

    alert("Your complaint has been emailed to the management.");
  };

  const formWidth = useBreakpointValue({ base: "100%", md: "500px" });

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
        onSubmit={handleSubmit}
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
            Student Feedback/Complaints Portal
          </Heading>

          <Text fontSize="sm" color="gray.600" textAlign="center">
            Please complete the form below for your complaints or feedback.
          </Text>

          <VStack spacing={4} w="full">
            <Box w="full">
              <FormLabel>Title</FormLabel>
              <Input
                variant="filled"
                name="title"
                value={complaintInfo.title}
                onChange={handleChange}
                placeholder="Course Registration Problems..."
                required
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
                name="lecturer"
                value={complaintInfo.lecturer}
                onChange={handleChange}
                placeholder="Dr. ...."
              />
            </Box>

            <Box w="full">
              <FormLabel>Nature of Complaint/Feedback</FormLabel>
              <Textarea
                variant="filled"
                name="nature_of_complaint"
                value={complaintInfo.nature_of_complaint}
                onChange={handleChange}
                placeholder="I have an issue ........"
                required
              />
            </Box>
          </VStack>

          <Button type="submit" colorScheme="red" size="lg" w="full">
            Submit Complaint
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
