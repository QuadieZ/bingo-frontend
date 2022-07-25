import { Stack, Image, HStack, Text } from "@chakra-ui/react"

export const GalleryItem = ({ image, mission, user }) => {
    if (image) return (
        <Stack p={4} border="2px" borderColor="brand.primary" w={["full", "full", "25vw"]}>
            <Image src={image} h="25vh" objectFit="cover" w={["full", "full", "30vw"]} />
            <HStack justify="space-between">
                <Text size={["xs", "md"]} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">{mission}</Text>
                <Text >{user}</Text>
            </HStack>
        </Stack >
    )
    return null
}