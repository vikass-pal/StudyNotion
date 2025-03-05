import React from 'react'

const RenderTotalAmount = () => {

    const {total} = useSelector((state) => state.cart)
    const handleBuyCourse= () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses", courses);
        // TODO api int payment gateway
    }

  return (

    <div>
        <p>Total:</p>
        <p>₹ {total}</p>
<IconBtn 
text="Buy Now"
onclick={handleBuyCourse}
customClasses={"w-full justify-center"}
/>

    </div>
  )
}

export default RenderTotalAmount