"use client"

import { useState } from "react";

interface Tab {
    id: string;
    label: string;
    data: { title: string; image: string; date?: string; href: string }[];
}

interface TabContentProps {
    TABS: Tab[];
}

export const TabContent: React.FC<TabContentProps> = ({ TABS }) => {
    // Estado del tab seleccionado (por defecto "elcomercio")
    const [selectedTab, setSelectedTab] = useState("elcomercio");

    // Función para cambiar el tab seleccionado
    const handleTabClick = (tabId: string) => {
        setSelectedTab(tabId);
    };

    // Obtener el listado de noticias de acuerdo al tab seleccionado
    const selectedNews = TABS.find((tab) => tab.id === selectedTab)?.data || [];
    return (
        <>
            {/* Botones de Tabs */}
            <div className="flex gap-3 pt-3 pb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`w-full px-4 py-2 bg-white text-black hover:bg-gray-200 ${ selectedTab === tab.id ? "bg-gray-300 font-bold" : ""
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Lista de Noticias */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gap: "1rem",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                }}
            >
                {selectedNews.map((item, index) => (
                    <a
                        key={index}
                        className="relative"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="relative h-52">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.date || "Fecha no disponible"}</p>
                        </div>
                    </a>
                ))}
            </div>
        </>
    )
}
