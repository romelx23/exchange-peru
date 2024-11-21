"use client"

export const ButtonShare = () => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "FoodDelivery",
                text: "Deliciosos platos entregados a su puerta!",
                url: "https://fooddelivery.com",
            }).then(() => {
                console.log("Contenido compartido");
            }).catch((error) => {
                console.error("Error al compartir", error);
            });
        } else {
            console.log("Web Share API no soportado");
        }
    }

    return (
        <button
            onClick={handleShare}
            title="Compartir"
            className="px-4 py-2 bg-gray-300 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
        </button>
    )
}