import { useEffect, useState } from 'react';
import * as Fathom from 'fathom-client';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
} from '@chakra-ui/react';

import isValidEmail from 'is-valid-email';

const NewsletterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [formResponse, setFormResponse] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  useEffect(() => {
    const isValid = isValidEmail(email);
    setEmailIsValid(isValid);
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      name,
      email,
    };

    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          setFormResponse({
            status: 'SUCCESS',
            message: 'Check your inbox to confirm your subscription!',
          });
          setIsSubmitting(false);
          Fathom.trackGoal('S0BKMQCZ');
        } else {
          setIsSubmitting(false);
          const b = await res.json();
          debugger;
          setFormResponse({
            status: 'ERROR',
            message: b.message,
          });
        }
      })
      .catch((error) => {
        setFormResponse({
          error: true,
          message: JSON.stringify(error),
        });
      });
  };

  if (formResponse.success) {
    return (
      <Stack>
        <Text>{formResponse.message}</Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <FormControl isRequired isInvalid={!emailIsValid}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="joao@example.com"
          background={'white'}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="name">First Name</FormLabel>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="João"
          background={'white'}
        />
      </FormControl>
      <Button
        isDisabled={!emailIsValid}
        isLoading={isSubmitting}
        loadingText="Subscribing..."
        colorScheme="purple"
        variant="solid"
        type="submit"
        onClick={handleSubmit}
      >
        Subscribe
      </Button>
      {formResponse.status === 'ERROR' && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{formResponse.message}</AlertDescription>
        </Alert>
      )}

      {formResponse.status === 'SUCCESS' && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>{formResponse.message}</AlertTitle>
        </Alert>
      )}
    </Stack>
  );
};

export default NewsletterForm;
