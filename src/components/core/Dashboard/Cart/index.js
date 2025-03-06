import { useSelector } from "react-redux"
import RenderCartCourses from "../Cart/RenderCartCourses"
import RenderTotalAmount from "../Cart/RenderTotalAmount"

export default function Cart() {

const { total, totalItems } = useSelector((state) => state.cart)



    return(
        <div className="text-richblack-5">
            <h1>Cart</h1>
            <p>{totalItems} Courses in Cart</p>
            {
                total > 0 ?
                (<div>
                   <RenderCartCourses />
                   <RenderTotalAmount /> 
                </div>) :
                (<div>
                    You have not regiatered to any course
                </div>) 
            }
        </div>
    )
}
