import { useState, useEffect } from 'react'
import axios from "axios";

const useFetch = () => {
    const [allYears, setAllYears] = useState([])
    const [years, setYears] = useState([])
    const [count, setCount] = useState([])

    // Fetch data from RapidAPI
    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://imdb8.p.rapidapi.com/actors/get-awards',
                params: { nconst: 'nm0001667' },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options)
                const dataPoint = response.data.resource.awards.map(award => award.year)
                setAllYears(dataPoint)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const getUniqueYears = (allYrs) => {
            let uniqueYrs = [];
            for (let i = 0; i < allYrs.length; i++) {
                if (uniqueYrs.includes(allYrs[i])) {
                    continue
                } else {
                    uniqueYrs.push(allYrs[i]);
                }
            }
            return uniqueYrs
        }

        if (allYears) {
            const yrs = getUniqueYears(allYears)
            setYears(yrs)
        }
    }, [allYears])

    useEffect(() => {
        const getCount = (uniqueYrs, allYrs) => {
            let frequency = []
            let totalCount = 0;
            for (let i = 0; i < uniqueYrs.length; i++) {
                for (let j = 0; j < allYrs.length; j++) {
                    if (uniqueYrs[i] === allYrs[j]) {
                        totalCount += 1
                    }
                }
                frequency.push(totalCount)
                totalCount = 0
            }
            return frequency
        }

        if (years) {
            const cnt = getCount(years, allYears)
            setCount(cnt)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [years])

    return ({ years, count })
}

export default useFetch