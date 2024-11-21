// import Image from "next/image";
import {
  getCambiaYGanaRates,
  getDollarHouseRates,
  getInstakash,
  getKambistaRates,
  getRextieRates,
  getSecurexRates,
  getTkambioRates,
} from "@/actions/exchange/exchange";
import CustomButton from "@/features/common/components/button-custom";
import { AdBanner } from "@/features/home/components/adbanner";
// import CustomCard from "@/features/common/components/card-custom";
// import { TabContent } from "@/features/home/components/tab-content";

interface Entity {
  id: string;
  label: string;
  data: {
    compra: number | null | undefined;
    venta: number | null | undefined;
  };
  image: string;
  url: string;
}

export default async function Home() {
  const kambistaRates = await getKambistaRates();

  const dollarHouseRates = await getDollarHouseRates();

  const rextieRates = await getRextieRates();

  const instakashRates = await getInstakash();

  const securexRates = await getSecurexRates();

  const tkambioRates = await getTkambioRates();

  const cambiayganaRates = await getCambiaYGanaRates();

  console.log({ dollarHouseRates });

  // Definir tabs disponibles
  const ListEntities: Entity[] = [
    {
      id: "1",
      label: "Kambista",
      data: kambistaRates,
      image:
        "https://res.cloudinary.com/react-romel/image/upload/v1731962186/apps/casa-cambio-app/logo7_gwvlhd.png",
      url: "https://kambista.com/"
    },
    {
      id: "2",
      label: "Dollar House",
      data: dollarHouseRates,
      image:
        "https://res.cloudinary.com/react-romel/image/upload/v1731962185/apps/casa-cambio-app/logo6_xu0nfg.jpg",
      url: "https://dollarhouse.pe/"
    },
    // {
    //   id: "3",
    //   label: "Rextie",
    //   data: rextieRates,
    //   image:
    //     "https://res.cloudinary.com/react-romel/image/upload/v1731962183/apps/casa-cambio-app/logo2_ngkl8h.png",
    //   url: "https://www.rextie.com/"
    // },
    {
      id: "4",
      label: "Instakash",
      data: instakashRates,
      image:
        "https://res.cloudinary.com/react-romel/image/upload/v1731962182/apps/casa-cambio-app/logo1_n4zjkr.jpg",
      url: "https://instakash.net/"
    },
    {
      id: "5",
      label: "Securex",
      data: securexRates,
      image:
        "https://res.cloudinary.com/react-romel/image/upload/v1731962184/apps/casa-cambio-app/logo4_fzf5my.png",
      url: "https://securex.pe/"
    },
    // {
    //   id: "6",
    //   label: "Tkambio",
    //   data: tkambioRates,
    //   image:
    //     "https://res.cloudinary.com/react-romel/image/upload/v1731962183/apps/casa-cambio-app/logo3_qlma2q.jpg",
    //   url: "https://tkambio.com/"
    // },
    {
      id: "7",
      label: "Cambia y Gana",
      data: cambiayganaRates,
      image:
        "https://res.cloudinary.com/react-romel/image/upload/v1731962184/apps/casa-cambio-app/logo5_twcyfy.png",
      url: "https://cambiaygana.com.pe/"
    },
  ];

  // funcion que calcula el mejor tipo de cambio del día	
  const bestRate = ListEntities.reduce((prev, current) => {
    if (prev.data?.compra && current.data?.compra) {
      return prev.data.compra > current.data.compra ? prev : current;
    }
    return prev;
  });

  console.log({ bestRate });

  return (
    <div className="flex items-center flex-col min-h-screen">
      <main className="flex-1 w-full px-2">
        <section className="w-full py-12 dark:bg-black min-h-[60vh]">
          {/* lista de todas las casas de cambio y su tipo de cambio */}

          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl dark:text-white">
                Tipos de Cambio
              </h1>
              <p className="mx-auto max-w-[600px] dark:text-gray-300 md:text-xl">
                A continuación, se muestra el tipo de cambio de las principales
                casas de cambio del Perú.
              </p>

              {/* banner que muestra el mejor tipo de camnbio */}

              <div className="w-full max-w-3xl mx-auto flex flex-col gap-2 p-2 bg-white dark:bg-gradient-to-r dark:from-slate-600 dark:to-gray-800 dark:text-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Mejor tipo de cambio del día</h2>
                <div className="flex justify-between">
                  <span>{bestRate.label}</span>
                  <span>{bestRate.data?.compra}</span>
                </div>
                <div className="flex justify-between">
                  <span>Venta</span>
                  <span>{bestRate.data?.venta}</span>
                </div>
                <a
                  href={bestRate.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-500 hover:underline"
                >
                  Ver más
                </a>
              </div>
              <AdBanner
                dataAdSlot="5730485238"
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
              />

              <div className="w-full max-w-5xl flex flex-wrap gap-3">
                {ListEntities.map((entity) => (
                  <div key={entity.id} className="px-4 w-full max-w-[300px]">
                    <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gradient-to-r dark:from-slate-600 dark:to-gray-800 dark:text-white">
                      <h2 className="text-xl font-bold">{entity.label}</h2>
                      <img
                        src={entity.image}
                        alt={entity.label}
                        className="w-full h-24 object-contain"
                      />
                      <div className="flex justify-between">
                        <span>Compra</span>
                        <span>{entity.data?.compra}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Venta</span>
                        <span>{entity.data?.venta}</span>
                      </div>
                      <a
                        href={entity.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-500 hover:underline"
                      >
                        Ver más
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <AdBanner
                dataAdSlot="5730485238"
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
              />

            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-black dark:text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center w-full max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl dark:text-white">
                Bienvenido a Cambio Mejorado
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
                Cambio Mejorado es una plataforma que obtiene los tipos de
                cambio de las principales casas de cambio del Perú.
              </p>
              <form
                action="https://cambio"
                method="get"
                className="w-full max-w-xl flex flex-col gap-4 mx-auto"
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Buscar casa de cambio"
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                />
                <CustomButton
                  type="submit"
                  disabled
                  className="w-full max-w-xl bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-200 disabled:opacity-50">
                  Suscribete ahora
                </CustomButton>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  próximamente
                </span>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
