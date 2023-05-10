import {  useState } from 'react'

const useDetectGeoPermission = () => {
    const [isAllow,setIsAllow] = useState(false)
    function getLocation() {   
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, 
            positionError);
        } else {
            // hideLoadingDiv()
            setIsAllow(false)

        }
    }

    function positionError() {    
            setIsAllow(false)
     }

    function showPosition(){
        setIsAllow(true)
    }
  return {isAllow,getLocation}
  
}

export default useDetectGeoPermission