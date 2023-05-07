import { Link } from "react-router-dom";

function Calendar() {
    return (
        <div className="fixed inset-0 dark:text-primaryText text-dark">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className=" text-2xl font-semibold w-60">
                    Calendar on support !
                </h1>
                <p className="text-center text-lg">
                    Return{" "}
                    <span className="underline">
                        <Link to="/">Home page</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Calendar;
