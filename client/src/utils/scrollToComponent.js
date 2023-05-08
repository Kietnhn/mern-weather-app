function scrollToComponent(link) {
    const comp = document.querySelector(link);
    comp.scrollIntoView({ behavior: "smooth", block: "start" });
}
export default  scrollToComponent