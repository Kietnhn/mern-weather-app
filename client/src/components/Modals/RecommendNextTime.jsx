import { useContext, useEffect, useState } from "react";
import { PositionContext } from "../../contexts/PositionContext";

const RecommendNextTime = ({
    positionOnMap,
    isGetRecommend,
    setIsGetRecommend,
    setPosition,
}) => {
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const [typePosition, setTypePosition] = useState("current");
    const handleChangeTypePosition = (e) => {
        const value = e.target.value;
        setTypePosition(value);
        if (isGetRecommend) {
            setPosition(positionOnMap || currentPosition);
        }
    };
    useEffect(() => {
        if (isGetRecommend) {
            setPosition(positionOnMap || currentPosition);
        } else {
            setPosition(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetRecommend, positionOnMap]);
    return (
        <div>
            <div className="between">
                <label htmlFor="recommend" className="mr-2">
                    Want to get recommendations next time ?
                </label>
                <input
                    type="checkbox"
                    name="recommend"
                    id="recommend"
                    value={isGetRecommend}
                    onChange={() => setIsGetRecommend(!isGetRecommend)}
                />
            </div>
            {isGetRecommend && (
                <div>
                    <div>
                        <label htmlFor="current">
                            Your current position:{" "}
                            <span>
                                {currentPosition.countryCode} -{" "}
                                {currentPosition.city}
                            </span>
                        </label>
                        <input
                            type="radio"
                            name="typePosition"
                            value="current"
                            checked={typePosition === "current"}
                            onChange={handleChangeTypePosition}
                        />
                    </div>
                    {positionOnMap && (
                        <div>
                            <label>
                                Position on map:{" "}
                                <span>
                                    {positionOnMap?.country} -{" "}
                                    {positionOnMap?.name}
                                </span>
                            </label>
                            <input
                                type="radio"
                                name="typePosition"
                                value="onMap"
                                checked={typePosition === "onMap"}
                                onChange={handleChangeTypePosition}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default RecommendNextTime;
