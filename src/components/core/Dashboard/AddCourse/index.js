import RenderSteps from "./RenderSteps"

export default function AddCourse ()  {
return (
    <>
    <div className="text-white">
        <div>
            <h1>
                Add Course
            </h1>
            <div>
                {/* Render the steps for adding a course */}
                <RenderSteps />

            </div>
        </div>
        <div>
            <p>Course Upload Tips</p>
            <ul>
                <li>Set the Course price option or make it free</li>
                <li>Set the Course price option or make it free</li>
                <li>Set the Course price option or make it free</li>
                <li>Set the Course price option or make it free</li>
                <li>Set the Course price option or make it free</li>
                <li>Set the Course price option or make it free</li>
                <li>Set the Course price option or make it free</li>
            </ul>
        </div>
    </div>
    </>
)
}
