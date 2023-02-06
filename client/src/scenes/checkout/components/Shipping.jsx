import React from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import AddressForm from './AddressForm'

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue
}) => {
  return (
    < Box m="30px auto">
      {/* Billing form */}
      < Box>
        < Typography sx={{mb:"15px", fontSize: "18px"} }>
          Billing Information
        </Typography>

        < AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}  
        />
      </Box>
      <Box mb="20px">
        <FormControlLabel
          label="Same for shipping address"
          control={
            < Checkbox
              defaultChecked
              values={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        />
      </Box>

      {/* shipping form */}

      {!values.shippingAddress.isSameAddress && (
        <Box>
          < Typography sx={{mb:"15px"}}>
            Shipping information
          </Typography>
          < AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
             
          />
        </Box>
      )}
    </Box>
  )
}

export default Shipping