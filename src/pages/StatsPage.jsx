import { useState, useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { BarChart } from "../components/BarChart"
import PieChart from "../components/PieChart"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

const API_URL = process.env.REACT_APP_API_URL

Chart.register(CategoryScale)

export default function App() {
  const { user } = useContext(AuthContext)
  //const [filteredData, setFilteredData] = useState([]);
  const storedToken = localStorage.getItem("authToken")
  const [barChart, setBarChart] = useState(true)
  //  const [buttonText, setButtonText] = ('Change to Pie Chart')

  const [chartData, setChartData] = useState({
    labels: ["happy", "in-love", "excited", "satisfied", "calm", "sad", "anxious", "angry", "embarressed", "depressed"],

    datasets: [
      {
        label: "Emotion Percentage",
        data: calcEmoPercentage([]),
        backgroundColor: ["#ffff54", "#ff54ffad", "#ff7d00", "#00b400", "#0089e0", "#afafaf", "#6851ff", "#ff0000", "#4e4e4e"],
      },
    ],
  })

  const toggleChart = () => {
    if (barChart === true) {
      setBarChart(false)
      //   setButtonText('Change to Bar Chart')
    } else {
      setBarChart(true)
      //  setButtonText('Change to Pie Chart')
    }
  }

  const getData = async () => {
    let response = await axios.get(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })

    let filteredPosts = await response.data.filter((post) => post.user === user._id)
    console.log("filteredPosts", filteredPosts)
    //  console.log(calcEmoPercentage(filteredPosts))
    //   setFilteredData(await filteredPosts);
    // setFilteredData(filteredPosts)

    setChartData({
      labels: ["happy", "in-love", "excited", "satisfied", "calm", "sad", "anxious", "angry", "embarrassed", "depressed"],

      datasets: [
        {
          label: "Emotion Percentage",
          data: calcEmoPercentage(filteredPosts),
          backgroundColor: ["#ffff54", "#ff54ffad", "#ff7d00", "#00b400", "#0089e0", "#afafaf", "#6851ff", "#ff0000", "#ff8c8c", "#4e4e4e"],
        },
      ],
    })
  }

  useEffect(() => {
    getData()
  }, [])

  function calcEmoPercentage(data) {
    if (data.length === 0) {
      return
    } else {
      let newEmotionArray = []
      let happy = 0
      let inLove = 0
      let excited = 0
      let satisfied = 0
      let calm = 0
      let sad = 0
      let anxious = 0
      let angry = 0
      let embarrassed = 0
      let depressed = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].emotion === "happy") {
          happy += 1
        }
        if (data[i].emotion === "in-love") {
          inLove += 1
        }
        if (data[i].emotion === "excited") {
          excited += 1
        }
        if (data[i].emotion === "satisfied") {
          satisfied += 1
        }
        if (data[i].emotion === "calm") {
          calm += 1
        }
        if (data[i].emotion === "sad") {
          sad += 1
        }
        if (data[i].emotion === "anxious") {
          anxious += 1
        }
        if (data[i].emotion === "angry") {
          angry += 1
        }
        if (data[i].emotion === "embarrassed") {
          embarrassed += 1
        }
        if (data[i].emotion === "depressed") {
          depressed += 1
        }
      }
      newEmotionArray.push(parseFloat(happy / data.length), parseFloat(inLove / data.length), parseFloat(excited / data.length), parseFloat(satisfied / data.length), parseFloat(calm / data.length), parseFloat(sad / data.length), parseFloat(anxious / data.length), parseFloat(angry / data.length), parseFloat(embarrassed / data.length), parseFloat(depressed / data.length))

      // console.log("newEmotionArray", newEmotionArray)
      return newEmotionArray
    }
  }

  return (
    <>
      {barChart && (
        <Container className="d-flex justify-content-center">
          <Button
            style={{ width: "800px", color: "black" }}
            className="shadow glass"
            onClick={toggleChart}>
            Click here to see Pie Chart{" "}
            <BarChart
              style={{ color: "white" }}
              chartData={chartData}
            />
          </Button>
        </Container>
      )}
      {!barChart && (
        <Container className="d-flex justify-content-center">
          <Button
            style={{ width: "800px", color: "black" }}
            className="shadow glass"
            variant="dark"
            onClick={toggleChart}>
            Click here to see Bar Chart
            <PieChart chartData={chartData} />
          </Button>
        </Container>
      )}
    </>
  )
}
