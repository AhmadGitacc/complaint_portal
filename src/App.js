import { Box, Button, FormLabel, Heading, HStack, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import emailjs from "emailjs-com";


function App() {
  const [complaintInfo, setComplaintInfo] = useState({
    title: "",
    lecturer: "",
    nature_of_complaint: "",
    submittedAt: ""
  })

  const handleChange = (e) => {
    setComplaintInfo({ ...complaintInfo, [e.target.name]: e.target.value })
  }

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

    alert("Your complaint has been emailed to the management.");
  }

  return (
    <Box w='100%' h='100vh' display='flex' justifyContent='center' alignItems='center'>

      <Box as="form" boxShadow='2xl' border='1px' borderRadius='lg' p={4}>
        <Image src={"/Lincoln.png"} alt='lcn logo' w='445px' h='100px' />
        <Heading size='xl' noOfLines={1}>Student Complaints Portal</Heading>
        <Text variant=''>Please complete ther form below for your complaints.</Text>
        <VStack spacing={4} p={2}>
          <VStack w='full' spacing={0} align='flex-start'>
            <FormLabel>Title</FormLabel>
            <Input variant="filled" onChange={handleChange} required name="title" value={complaintInfo.title} placeholder='Course Registration Problems..' />
          </VStack>

          <VStack w='full' spacing={0} align='flex-start'>
            <HStack spacing={0} align='baseline'>
              <FormLabel>Lecturer's Name</FormLabel>
              <Text color='GrayText'>(Optional)</Text>
            </HStack>
            <Input variant="filled" onChange={handleChange} name="lecturer" value={complaintInfo.lecturer} placeholder='Dr. ....' />
          </VStack>

          <VStack w='full' spacing={0} align='flex-start'>
            <FormLabel>Nature of Complaint</FormLabel>
            <Textarea variant='filled' onChange={handleChange} required name="nature_of_complaint" value={complaintInfo.nature_of_complaint} placeholder='I have an issue ........' />
          </VStack>
        </VStack>
        <Button variant='solid' w='full' onClick={handleSubmit} colorScheme="red">
          Submit Complaint
        </Button>
      </Box>

    </Box>
  );
}

export default App;
