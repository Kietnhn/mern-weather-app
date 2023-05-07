function Today() {
    return (
        <>
            {/* current location */}
            <div className="text-2xl font-semibold mt-10  animate-pulse  ">
                Current Location
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[70vh] overflow-auto p-6">
                <div className="w-1/2 p-3 animate-pulse bg-text mb-2 rounded-xl">
                    <div className="h-[88px] w-full"></div>
                </div>
                {/* hourly */}
                <div className="w-full  flex  overflow-auto -mx-1  pb-2 border-b-2 ">
                    {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                        <div className="w-1/5 px-1 " key={`hourly ${number}`}>
                            <div className="w-full h-[90px] p-2 animate-pulse bg-text rounded-lg"></div>
                        </div>
                    ))}
                </div>
                {/* forecast */}
                <div className="w-full flex flex-col my-2">
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                        <div
                            className="mb-1 w-full h-[46px] animate-pulse bg-text rounded-xl"
                            key={`forecast ${number}`}
                        ></div>
                    ))}
                </div>
                {/* more info */}
                <div className="w-full flex flex-wrap ">
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                        <div className="w-1/2 p-2 " key={`info ${number}`}>
                            <div className="h-[86px]  w-full animate-pulse bg-text rounded-xl"></div>
                        </div>
                    ))}
                </div>
                {/* chart sun */}
                <div className="h-[122px] w-full animate-pulse bg-text rounded-xl"></div>
            </div>
        </>
    );
}

export default Today;
