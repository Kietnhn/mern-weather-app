function getFlagUrlByIsoCode(isoCode,style = "flat",size = 24) {
    return `https://flagsapi.com/${isoCode}/${style}/${size}.png`
}
export default getFlagUrlByIsoCode