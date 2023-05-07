import {
    GoodIcon,
    FairIcon,
    ModerateIcon,
    PoorIcon,
    VeryPoorIcon,
    UnknowIcon,
} from "../components/icons";

function getStateOfAir(index) {
    const air = [
        {
            status: "Good",
            icon: GoodIcon,
        },
        {
            status: "Fair",
            icon: FairIcon,
        },
        {
            status: "Moderate",
            icon: ModerateIcon,
        },
        {
            status: "Poor",
            icon: PoorIcon,
        },
        {
            status: "Very Poor",
            icon: VeryPoorIcon,
        },
    ];
    return (
        air[index] || {
            status: "Unknow",
            icon: UnknowIcon,
        }
    );
}

export const getStateOfAirIcon = ({ status }) => {
    const air = {
        Good: GoodIcon,
        Fair: FairIcon,
        Moderate: ModerateIcon,
        Poor: PoorIcon,
        VeryPoor: VeryPoorIcon,
        Unknow: UnknowIcon,
    };
    return air[status];
};

export default getStateOfAir;
