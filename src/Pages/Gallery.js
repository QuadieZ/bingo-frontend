import { Spinner, Flex, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { GalleryItem } from '../components/GalleryItem';

export const Gallery = () => {
    const cookies = new Cookies()
    const token = cookies.get("TOKEN")
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [bingo, setBingo] = useState([])

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "https://ld-bingo-server.herokuapp.com/gallery",
        };

        axios(configuration)
            .then((result) => {
                if (data.length === 0) setData(result.data)
            })
            .catch((error) => {
                console.error(error)
            });
    }, [data])

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
                if (bingo.length === 0) {
                    setBingo(result.data.map(el => el.mission))
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }, [token, bingo])
    console.log(bingo)

    if (data.length === 0 || bingo.length === 0) return <Flex w="100vw" h="100vh" align="center" justify="center"><Spinner size="xl" color="brand.primary" /></Flex>
    return (
        <>
            <Flex pos="absolute" top="0" w="full" p={4} justify="space-between" align="flex-end">
                <Image src="/bingo.png" boxSize={6} onClick={() => { navigate("/bingo") }} />
            </Flex>
            <Flex px={6} py={10} flexDir="column" align="center" gap={4}>
                <Heading>Gallery</Heading>
                <Flex flexDir={["column", "column", "row"]} flexWrap="wrap" gap={4} align="center" justify="center">
                    {data.map(user => {
                        return (
                            user.completed.map((el, i) => {
                                return el && <GalleryItem image={el} user={user.username} mission={bingo[i]} />
                            }
                            )
                        )
                    })}
                </Flex>
            </Flex>
        </>
    )
}