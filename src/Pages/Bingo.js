import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useDisclosure } from "@chakra-ui/react"
import {
    Flex,
    Grid,
    GridItem,
    Image,
    Stack,
    HStack,
    Text,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Spinner
} from "@chakra-ui/react"
import { CircleIcon } from "../components/CircleIcon"
import { placeColorToken } from "../theme"

export const BingoItem = (props) => {
    const { mission, location, image, details } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    var isCompleted

    const bingoItemStyle = {
        colSpan: 1,
        rowSpan: 1,
        p: 1,
        minH: 0,
        minW: 0,
        borderRadius: 5,
        border: mission === 'Free!' || isCompleted ? "0px" : ["1px", "2px"],
        borderColor: [placeColorToken[location], placeColorToken[location]],
        bg: mission === 'Free!' || isCompleted ? 'brand.secondary' : 'bg.light',
        onClick: mission === 'Free!' || isCompleted ? null : onOpen,
    }

    return (
        <>
            <GridItem {...bingoItemStyle}>
                <Stack align="center" justify="center" spacing={[0, 2]} h="100%" p={1}>
                    <Text fontSize={["xs", "lg"]} textAlign="center" lineHeight={["15px", "20px"]} color={mission === 'Free!' || isCompleted ? 'content.contrast' : 'content.primary'}>{mission}</Text>
                </Stack>
            </GridItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mx={5}>
                    <ModalHeader>{mission}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>
                            {details}
                        </Text>
                        {image && <Image src={image} mb={2} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export const Bingo = () => {
    const cookies = new Cookies()
    const token = cookies.get("TOKEN")

    const [data, setData] = useState([])
    console.log(data)

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "https://ld-bingo-server.herokuapp.com/bingo",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios(configuration)
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.error(error)
            });
    }, [token])

    if (data.length === 24) setData(prev => prev.splice(12, 0, { mission: "Free!" }))

    if (data.length === 25) return (
        <Flex w="100vw" h="100vh" bgColor="bg.light" align="center" justify="center" pb={[20, 0]} flexDir="column">
            <Heading pb={[10, 5]}>Cultural Trip</Heading>
            <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(5, 1fr)' w={["90vw", "80vh"]} gap={1} h={["90vw", "80vh"]}>
                {data.length !== 0 && data.map(el => (<BingoItem {...el} />))}
            </Grid>
            <Stack pos="absolute" bottom="0" right="0" m={4}>
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
        </Flex>
    )

    return <Flex w="100vw" h="100vh" align="center" justify="center"><Spinner size="xl" color="brand.primary" /></Flex>
}