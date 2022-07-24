import { useState } from "react"

import {
    Flex,
    Grid,
    Stack,
    HStack,
    Text,
    Heading,
    Spinner,
} from "@chakra-ui/react"
import { placeColorToken } from "../../theme"
import { CircleIcon } from "../CircleIcon"
import { CameraComponent } from "./CameraComponent"
import { BingoItem } from "./BingoItem"

export const BingoTable = ({ item }) => {
    const [visible, setVisible] = useState(false)

    if (item.length > 0) {
        return (
            <Flex w="100vw" h="100vh" bgColor="bg.light" align="center" justify="center" pb={[20, 0]} flexDir="column">
                <Heading pb={[10, 5]}>Cultural Trip</Heading>
                <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(5, 1fr)' w={["90vw", "80vh"]} gap={1} h={["90vw", "80vh"]}>
                    {item.length !== 0 && item.map((el, i) => (<BingoItem {...el} index={i} setVisible={setVisible} />))}
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
                <CameraComponent visible={visible} setVisible={setVisible} />
            </Flex>
        )
    }

    return <Flex w="100vw" h="100vh" align="center" justify="center"><Spinner size="xl" color="brand.primary" /></Flex>
}