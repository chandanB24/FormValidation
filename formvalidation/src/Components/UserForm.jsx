import { Avatar, Box, Button, Divider, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, Stack, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import  {FaPhone, FaUserCircle}  from 'react-icons/fa'
import {MdDateRange, MdEmail} from 'react-icons/md'
import {LinearTextGradient} from "react-text-gradients-and-animations";
import axios from 'axios';

const UserForm = () => {

//creating a object for form data using useStatehook
const [formData,setFormData]=useState({
    name:'',
    email:'',
    address:'',
    mobile:'',
    dob:''
});

//creating a another object to display errors if conditions doesn't match

const [errors, setErrors] = useState({
    name: '',
    email: '',
    address: '',
    mobile: '',
    dob: ''
  });


//function to set form data

const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
}


//function to validate the form fields
const handleSubmit = (e) =>{
    e.preventDefault();
    let isValid=true;
    const newErrors = {...errors};


    //name validation

    const nameRegex = /^[A-Za-z ]+$/
    if(!nameRegex.test(formData.name))
    {
        newErrors.name='Invalid name'
        isValid=false;
    }


    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email))
    {
        newErrors.email='Invalid email';
        isValid=false;
    }

    //phone validation

    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = 'Invalid phone number';
      isValid = false;
    }

    //dob validation
    const dobRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    if (!dobRegex.test(formData.dob)) {
      newErrors.dob = 'Invalid date format (DD-MM-YYYY)';
      isValid = false;
    }

    if(isValid)
    {
        
        axios.post("http://localhost:3001/register",formData).then( setFormData({
            name: '',
            email: '',
            address: '',
            mobile: '',
            dob: ''
          }));
    
    }
    else{
        setErrors(newErrors);
    }

}   

  return (
    <Box w='100%' h='100vh' display='flex' justifyContent='center' alignItems='center' bg='gray.300'>
        <Flex justifyContent='center' width='400px' bg='white' boxShadow='lg' borderRadius='10px' flexDirection='column' p='15px'>
            <VStack>
            <Heading as='h1' size={{base:'md',lg:'xl'}} >
                <LinearTextGradient angle={45} colors={["#FE7C22", "#FFE134"]} animate='true' animateDuration='1' animateDirection='vertical'>
            User Form
            </LinearTextGradient></Heading>
            <Avatar name='' size={{base:'md',lg:'lg'}} bg='orange.400'/>
            <Divider h='3px' bg='black' borderRadius='5px'/>
            </VStack>
            <Box mt='10px'>
            <form>
                <Stack spacing={4} >
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<FaUserCircle />}/>
                            <Input type='text' placeholder='Name' name='name' required onChange={handleChange} value={formData.name}/>
                        </InputGroup>
                        {errors.name && <FormHelperText color='red' fontWeight='20px' ml='5px'>{errors.name}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <InputGroup width='100%'>
                            <InputLeftElement children={<MdEmail />}/>
                            <Input type='email' placeholder='Email' name='email' required onChange={handleChange} value={formData.email}/>
                            </InputGroup>
                            {errors.email && <FormHelperText color='red' fontWeight='20px' ml='5px'>{errors.email}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <Textarea placeholder='Residential Adress'size='sm' name='address' required onChange={handleChange} value={formData.address}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<FaPhone />}/>
                            <Input type='number' placeholder='Mobile no.' name='mobile' required onChange={handleChange} 
                            value={formData.mobile}/>
                        </InputGroup>
                        {errors.mobile && <FormHelperText color='red' fontWeight='20px' ml='5px'>{errors.mobile}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<MdDateRange/>}/>
                            <Input type='text' placeholder='DOB' name='dob' required onChange={handleChange} value={formData.dob}/>
                        </InputGroup>
                        {errors.dob && <FormHelperText color='red' fontWeight='20px' ml='5px'>{errors.dob}</FormHelperText>}
                    </FormControl>
                    <Divider h='3px' bg='black' borderRadius='5px'/>
                    <Button colorScheme='orange' variant='solid' type='submit' onClick={handleSubmit}>Submit</Button>
                </Stack>
            </form>
            </Box>
        </Flex>
    </Box>
  )
}

export default UserForm