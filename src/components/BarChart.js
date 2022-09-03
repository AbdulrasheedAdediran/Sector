import { useState, useEffect } from "react"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from "react-chartjs-2"
import useFetch from "../utils/useFetch"

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
)

const BarChart = () => {
    const { years, count } = useFetch()
    const [sortedYears, setSortedYears] = useState()
    const [sortedCount, setSortedCount] = useState()

    useEffect(() => {
        if (count) {
        // Sorts years in ascending order and maps the corresponding count to each year
        const keys = Array.from(years.keys()).sort((x, y) => years[x] - years[y])
        const sortedYrs = keys.map(i => years[i])
        const sortedCnt = keys.map(i => count[i])
        setSortedYears(sortedYrs)
        setSortedCount(sortedCnt)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const data = {
        labels: sortedYears,
        datasets: [{
            label: 'Count',
            data: sortedCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.42)',
                'rgba(54, 162, 235, 0.42)',
                'rgba(255, 206, 86, 0.42)',
                'rgba(75, 192, 192, 0.42)',
                'rgba(153, 102, 255, 0.42)',
                'rgba(255, 159, 64, 0.42)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.85)',
                'rgba(54, 162, 235, 0.85)',
                'rgba(255, 206, 86, 0.85)',
                'rgba(75, 192, 192, 0.85)',
                'rgba(153, 102, 255, 0.85)',
                'rgba(255, 159, 64, 0.85)'
            ],
            borderWidth: 1
        }]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                gridLines: {
                    display: false,
                    color: "rgba(0, 0, 0, 1)"
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Years'
                },
                ticks: {
                    fontColor: "hsla(231, 77%, 90%, 0.75)",
                    fontSize: 18,
                    stepSize: 1,
                    beginAtZero: true
                }
            },
            y: {
                beginAtZero: true,
                gridLines: {
                    display: true,
                    zeroLineColor: 'white',
                    color: 'transparent'
                }
            }
        },
        legend: {
            display: true,
            postion: 'top',
            labels: {
                fontSize: 26,
                fontColor: "hsla(231, 77%, 90%, 0.75)",
                label: 'Count',
            }
        }
    }

    return (
        <section className="chart-container">
            <Bar height={400} data={data} options={options} />
        </section>
    )
}

export default BarChart