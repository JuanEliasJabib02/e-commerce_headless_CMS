import React, { useEffect, useState } from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../state/slices/cartSlice"
import axios from "axios"

const ShoppingList = () => {

  const dispatch = useDispatch()
  const [value, setValue] = useState("all")
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width_600px)")
  
  const handleChange = (event, newValue) => {
    setValue(newValue)

  }

  useEffect(() => {
  const URL = "http://localhost:1337/api/items?populate=image"

  axios.get(URL)
    .then(res => dispatch(setItems(res.data)))
    .catch(err => console.log(err))
  }, []) 
  

  const topRatedItems = items.data?.filter(
    (item) => item.attributes.category === "topRated"
  )

  const newArrivals = items.data?.filter(
    (item) => item.attributes.category === "newArrivals"
  )


  const bestSellers = items.data?.filter(
    (item) => item.attributes.category === "bestSellers"
  )



  
  return (
    < Box
      width="80%"
      margin="80px auto"
    >
      < Typography variant="h3" textAlign="center">
        Our Feautured <b>Products</b>
      </Typography>
      < Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          sx: {
            display: isNonMobile ? "block" : "none"
          }
        }}
        sx={{
          m :"25px",
          "& .MuiTabs-flexContainer" : {
            flexWrap: "wrap"
          }   
        }}
      >
        < Tab label="ALL" value="all" />
        < Tab label="NEW ARRIVALS" value="newArrivals" />
        < Tab label="BEST SELLERS" value="bestSellers" />
        < Tab label="TOP RATED" value="topRated" /> 
      </Tabs>

      {/* Responsive box item list */}
      < Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill,300px)"
        justifyContent="space-around"
        rowGap="20px"
      >
        {value === "all" && items.data?.map((item) => (
          < Item
            item={item}
            key={`${item.name} - ${item.id}`}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ShoppingList