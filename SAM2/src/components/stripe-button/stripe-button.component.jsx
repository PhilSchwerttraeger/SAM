import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({ price }) => {
  // stripe wants price in CENTS
  const priceForStripe = price * 100
  const publishableKey = "pk_test_cMH621zEuEoRFIpevf6Wijjo00NivMjjoJ"

  // to backend later
  const onToken = token => {
    console.log(token)
    alert("Payment successfull.")
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
