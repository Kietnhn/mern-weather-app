import  { useState } from 'react'

const useDetectUserDevice = () => {
  const [isMobile] = useState(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  return [isMobile]
}

export default useDetectUserDevice