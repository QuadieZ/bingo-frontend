import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { BingoTable } from '../components/Bingo/BingoTable'

export const Bingo = () => {
    const cookies = new Cookies()
    const token = cookies.get("TOKEN")

    const [data, setData] = useState([])

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