import { useEffect, useState } from "react";
const useScroll = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        window.addEventListener("scrool", () => {
            setScrollPosition(window.pageYOffset);
        });
        return () =>
            window.removeEventListener("scrool", () => {
                setScrollPosition(window.pageYOffset);
            });
    }, []);
    return scrollPosition;
};
export default useScroll;
