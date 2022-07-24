import { Box, Heading, Stack, Text, FormLabel, FormControl, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import axios from 'axios'
import { FormErrorMessage } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const Home = ({ setCompleted, setIsBingo }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleSubmit = (e) => {
        e.preventDefault()
        const configuration = {
            method: "post",
            url: "https://ld-bingo-server.herokuapp.com/login",
            data: {
                username,
                password,
            },
        };
        axios(configuration)
            .then((result) => {
                setError(false)
                setCompleted(result.data.completed)
                setIsBingo(result.data.isBingo)
                cookies.set("TOKEN", result.data.token, {
                    path: "/"
                })
                cookies.set("USERNAME", username)
                navigate("/bingo")
            })
            .catch((error) => {
                error = new Error();
                setError(true)
            })
    }

    return (
        <Stack w="100%" h="100vh" bgColor="bg.light" textAlign="center" align="center" justify="center" px={10} spacing={6} pb={12}>
            <Stack spacing={2}>
                <Box>
                    <Heading fontWeight="medium">Welcome!</Heading>
                    <Text>Leadership Camp 2022</Text>
                </Box>
                <Text color="brand.primary">"Together We are Stronger"</Text>
            </Stack>
            <FormControl isInvalid={error}>
                <Stack gap={10}>
                    <Stack spacing={2}>
                        <Stack spacing={0}>
                            <FormLabel>Username</FormLabel>
                            <Input id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Stack>
                        <Stack spacing={0}>
                            <FormLabel>Password</FormLabel>
                            <Input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Stack>
                        <FormErrorMessage>Username or password not found.</FormErrorMessage>
                    </Stack>
                    <Button bgColor="brand.primary" color="content.contrast" type="submit" onClick={(e) => handleSubmit(e)}>Login</Button>
                </Stack>
            </FormControl>
        </Stack>
    )
}