function Button({ content, className = "", icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`text-primaryText bg-secondDark icon rounded-full flex items-center justify-center ${className}`}
        >
            {content && <span>{content}</span>}
            <span>{icon}</span>
        </button>
    );
}
export default Button;
