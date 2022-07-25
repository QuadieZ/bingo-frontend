import { useDisclosure } from "@chakra-ui/react"
import {
    Stack, Image, HStack, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

export const GalleryItem = ({ image, mission, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (image) return (
        <>
            <Stack p={4} border="2px" borderColor="brand.primary" w={["full", "full", "25vw"]} onClick={onOpen}>
                <Image src={image} h="25vh" objectFit="cover" w={["full", "full", "30vw"]} />
                <HStack justify="space-between">
                    <Text size={["xs", "md"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">{mission}</Text>
                    <Text >{user}</Text>
                </HStack>
            </Stack >

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent mx={4}>
                    <ModalCloseButton />
                    <ModalBody pt={10} pb={8}>
                        <Stack >
                            <HStack justify="space-between">
                                <Text size={["xs", "md"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">{mission}</Text>
                                <Text >{user}</Text>
                            </HStack>
                            <Image src={image} h="60vh" objectFit="contain" />
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
    return null
}