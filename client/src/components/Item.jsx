import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { shades } from "../theme";
import { addToCart } from "../state/slices/cartSlice";
import { useNavigate } from "react-router-dom";



const Item = ({ item, width }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false);
  const {palette:{neutral}} = useTheme()


  const { category, price, name, image } = item.atributtes
  
  const {
    data: {
      atributtes: {
        formats: {
          medium: { url },
        }
      }
    }
  } = image;


  return (
    <Box width={width}>
      < Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={ () =>  setIsHovered(false)}
      >
        <img
          alt="item.name" width="300px" height="400px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        < Box
          display={isHovered ? "blocked" : "none"}
          position="absolute"
          bottom="10%"
          width="100%"
          padding="0 5%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
          >
            < Box
              display="flex"
              justifyContent="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              < IconButton
                onClick={() => setCount(Math.max(count - 1,1))}
              >
                < RemoveIcon/>
              </IconButton>
              < Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton IconButton
                onClick={() => setCount(Math.max(count + 1,1))}
              >
                < AddIcon/>
              </IconButton>

            </Box>
            {/* Button */}
            <Button
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={
                {
                  backgroundColor: shades.primary[300],
                  color:"white"
                }
              }
            > 
               Add to cart
            </Button>
          </Box>
        </Box>
      </Box>

      < Box mt="3px">
        < Typography variant="subtitle2" color={neutral.dark}>
          {category.replace(/(A-Z)/g, "$1")
            .replace(/^./, () =>  str.toUpperCase())
          }

          < Typography>{name}</Typography>
          < Typography fontWeight="bold">{price}</Typography>
              
        </Typography>
      </Box>
    </Box>
  )

}