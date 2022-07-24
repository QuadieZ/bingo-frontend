import { useDisclosure } from "@chakra-ui/react"

import {
    GridItem,
    Image,
    Stack,
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { placeColorToken } from "../../theme"

export const BingoItem = (props) => {
    const { mission, location, image, details, index, setVisible, setCurrent, isCompleted } = props
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleOpen = () => {
        onOpen()
        setCurrent(index)
    }

    const handleClose = () => {
        onClose()
        setCurrent("")
    }

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
        onClick: isCompleted ? null : handleOpen,
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

            <Modal isOpen={isOpen} onClose={handleClose} isCentered>
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
                        <Button leftIcon={<Image src="/camera.png" boxSize={6} />} bgColor="brand.primary" color="content.contrast" onClick={() => setVisible(true)}>Take a picture</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}