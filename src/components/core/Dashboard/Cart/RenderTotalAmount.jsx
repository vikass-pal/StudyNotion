import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../HomePage/common/IconBtn'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {buyCourse} from '../../../../services/operations/studentFeaturesAPI'


const RenderTotalAmount = () => {
    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleBuyCourse= () => {
        const courses = cart.map((course) => course._id);
        // console.log("Bought these courses", courses);
        buyCourse(token, courses, user, navigate, dispatch)
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