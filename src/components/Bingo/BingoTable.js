import { useState } from "react"

import {
    Flex,
    Grid,
    Stack,
    HStack,
    Text,
    Heading,
    Spinner,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { placeColorToken } from "../../theme"
import { CircleIcon } from "../CircleIcon"
import { CameraComponent } from "./CameraComponent"
import { BingoItem } from "./BingoItem"
import Cookies from "universal-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react"

export const BingoTable = ({ item, completed, setCompleted }) => {
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState("")
    const [sent, setSent] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const cookies = new Cookies()
    const token = cookies.get("TOKEN")
    const username = cookies.get("USERNAME")

    if (!completed) {
        const configuration = {
            method: "get",
            url: "https://ld-bingo-server.herokuapp.com/data",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios(configuration)
            .then((result) => {
                result.data.forEach((d, i) => {
                    if (d.username === username) setCompleted(result.data[i].completed)
                })
            })
            .catch((error) => {
                console.error(error)
            });
    }

    if (item.length > 0) {
        return (
            <Flex w="100vw" h="100vh" bgColor="bg.light" align="center" justify="center" pb={[20, 0]} flexDir="column">
                <Heading pb={[6, 5]}>Cultural Trip</Heading>
                <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(5, 1fr)' w={["90vw", "80vh"]} gap={1} h={["90vw", "80vh"]}>
                    {item.length !== 0 && item.map((el, i) => (<BingoItem {...el} index={i} key={i} setVisible={setVisible} setCurrent={setCurrent} completed={completed} sent={sent} setSent={setSent} />))}
                </Grid>
                <HStack pos="absolute" bottom="0" w="full" p={4} justify="space-between" align="flex-end">
                    <HStack gap={2}>
                        <Image src="/gallery.png" boxSize={6} onClick={() => { navigate("/gallery") }} />
                        <Image src="/pattern.png" boxSize={6} onClick={onOpen} />
                    </HStack>
                    <Stack>
                        <HStack color={placeColorToken.all}>
                            <CircleIcon /><Text>All Places</Text>
                        </HStack>
                        <HStack color={placeColorToken.palace}>
                            <CircleIcon /><Text >Grand Palace</Text>
                        </HStack>
                        <HStack color={placeColorToken.arun}>
                            <CircleIcon /><Text >Wat Arun</Text>
                        </HStack>
                        <HStack color={placeColorToken.po}>
                            <CircleIcon /><Text >Wat Po</Text>
                        </HStack>
                    </Stack>
                </HStack>
                <CameraComponent visible={visible} setVisible={setVisible} current={current} setCompleted={setCompleted} sent={sent} setSent={setSent} />
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent mx={4}>
                        <ModalHeader>Bingo Pattern</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image src="/bingo_pattern.png" />
                        </ModalBody>

                        <ModalFooter>
                            <Text>Bingo can be any line. Capture and send to line group when you have a bingo!</Text>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        )
    }

    return <Flex w="100vw" h="100vh" align="center" justify="center"><Spinner size="xl" color="brand.primary" /></Flex>
}