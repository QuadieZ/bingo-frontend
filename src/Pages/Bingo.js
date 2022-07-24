import { useState, useEffect, useRef } from 'react'
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
    Spinner,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"
import { CircleIcon } from "../components/CircleIcon"
import { placeColorToken } from "../theme"
import { Button } from '@chakra-ui/react'
import { Camera } from "react-camera-pro"

const CameraComponent = () => {
    const camera = useRef(null);
    const [taken, setTaken] = useState(null);

    return (
        <>
            <Stack w="full" h="full" pos="fixed" top="0" right="0"><Camera ref={camera} /></Stack>
            <Stack w="full" h="full" align="center" justify="flex-end" pb={4}>
                <Button bg="brand.primary" p={4} size="2xl" borderRadius="full" _hover={{ bg: 'brand.secondary' }}><Image src="/camera.png" boxSize={6} onClick={() => setTaken(camera.current.takePhoto())} /></Button>
                {taken ?? <Image src={taken} />}
            </Stack>
        </>)
}

const BingoItem = (props) => {
    const { mission, location, image, details, index } = props
    const { isOpen, onOpen, onClose } = useDisclosure()

    const btnRef = useRef()
    const { isOpen: isOpenCam, onOpen: onOpenCam, onClose: onCloseCam } = useDisclosure()

    var isCompleted

    const bingoItemStyle = {
        colSpan: 1,
        rowSpan: 1,
        p: 1,
        minH: 0,
        minW: 0,
        borderRadius: 5,
        border: isCompleted ? "0px" : ["1px", "2px"],
        borderColor: [placeColorToken[location], placeColorToken[location]],
        bg: isCompleted ? 'brand.secondary' : 'bg.light',
        onClick: isCompleted ? null : onOpen,
    }

    return (
        <>
            {
                index === 12 &&
                <GridItem {...bingoItemStyle} border="0px" bg="brand.secondary" onClick={null}>
                    <Stack align="center" justify="center" spacing={[0, 2]} h="100%" p={1}>
                        <Text fontSize={["xs", "lg"]} textAlign="center" lineHeight={["15px", "20px"]} color='content.contrast'>Free!</Text>
                    </Stack>
                </GridItem>
            }
            <GridItem {...bingoItemStyle}>
                <Stack align="center" justify="center" spacing={[0, 2]} h="100%" p={1}>
                    <Text fontSize={["xs", "lg"]} textAlign="center" lineHeight={["15px", "20px"]} color={isCompleted ? 'content.contrast' : 'content.primary'}>{mission}</Text>
                </Stack>
            </GridItem>



            <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                    <ModalFooter>
                        <Button leftIcon={<Image src="/camera.png" boxSize={6} />} bgColor="brand.primary" color="content.contrast" ref={btnRef} onClick={onOpenCam}>Take a picture</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <CameraComponent />
            {/*<Drawer
                isOpen={isOpenCam}
                placement='bottom'
                onClose={onCloseCam}
                isFullHeight
                finalFocusRef={btnRef}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <HStack w="100%" justify="space-between">
                            <Text>Loading Camera...</Text>
                            <Button onClick={onCloseCam} bgColor="bg.light" zIndex={100}>
                                Close Camera
                            </Button>
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody>
                        <CameraComponent />
                    </DrawerBody>
                </DrawerContent>
        </Drawer>*/}
        </>
    )
}

const BingoTable = ({ item }) => {
    console.log(item)
    if (item.length > 0) {
        return (
            <Flex w="100vw" h="100vh" bgColor="bg.light" align="center" justify="center" pb={[20, 0]} flexDir="column">
                <Heading pb={[10, 5]}>Cultural Trip</Heading>
                <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(5, 1fr)' w={["90vw", "80vh"]} gap={1} h={["90vw", "80vh"]}>
                    {item.length !== 0 && item.map((el, i) => (<BingoItem {...el} index={i} />))}
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
    }

    return <Flex w="100vw" h="100vh" align="center" justify="center"><Spinner size="xl" color="brand.primary" /></Flex>
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
                if (data.length === 0) setData(result.data)
            })
            .catch((error) => {
                console.error(error)
            });
    }, [token, data])

    return <BingoTable item={data} />
}