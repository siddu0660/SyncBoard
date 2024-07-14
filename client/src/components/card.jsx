function Card ({isDarkMode , image , title}) {
    return (
        <div>
            <img src={image} className="h-48 w-auto object-cover bg-blend-multiply"/>
            <h2 className={`text-center text-xl font-bold mx-auto p-2 ${isDarkMode ? "text-gray-800" : "text-gray-100"}`}>{title}</h2>
        </div>
    )
}

export default Card