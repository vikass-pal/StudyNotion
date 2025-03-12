import RenderSteps from "./RenderSteps"
import { AiFillThunderbolt } from "react-icons/ai";
export default function AddCourse ()  {
return (
    <>
    <div className="text-richblack-25 flex">
        <div>
            <h1>
                Add Course
            </h1>
            <div>
                {/* Render the steps for adding a course */}
                <RenderSteps />

            </div>
        </div>
        <div className="w-[490px] h-fit  rounded-lg bg-richblack-800 gap-y-3 m-6 p-9  -translate-y-8 "> 
                <div className="flex -translate-x-6 ">
                <AiFillThunderbolt className="text-[25px] translate-y-2 mb-4 " /> 
            <p className="text-3xl font-bold" > Course Upload Tips</p>

                </div>
                <ul className="mt-2 list-disc">
                <li >Set the Course price option or make it free</li>
                <li className="mt-2">Standard size for the course thumbnail is 1024x576</li>
                <li className="mt-2">Video section controls the course overview video</li>
                <li className="mt-2">Course Builder is where you create & organize a course</li>
                <li className="mt-2">Add Topics in the Course Builder section to create lessons, quizzes, and assignments</li>
                <li className="mt-2">Information from the Additional Data section shows up on the course single page.</li>
                <li className="mt-2">Make Announcements to notify any important</li>
                <li className="mt-2">Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
    </>
)
}
