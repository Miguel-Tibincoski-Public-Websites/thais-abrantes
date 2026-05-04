import { useEffect, useState } from "react";
import {
  IconBrandInstagram,
  IconMail,
  IconMessage,
  IconChevronRight,
} from "@tabler/icons-react";

type ThemeStyle = {
  backgroundImage: string;
  cardBackground: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("links");
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>({
    backgroundImage: "linear-gradient(180deg, #9C8266 0%, #8B7355 100%)",
    cardBackground:
      "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))",
  });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/profile_picture.jpg";

    const clamp = (value: number) => Math.min(255, Math.max(0, value));
    const rgbToCss = (rgb: [number, number, number]) =>
      `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const adjustColor = (rgb: [number, number, number], amount: number) =>
      [
        clamp(rgb[0] + amount),
        clamp(rgb[1] + amount),
        clamp(rgb[2] + amount),
      ] as [number, number, number];

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size).data;
      let leftSum: [number, number, number] = [0, 0, 0];
      let rightSum: [number, number, number] = [0, 0, 0];
      let leftCount = 0;
      let rightCount = 0;

      const step = 8;
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const index = (y * size + x) * 4;
          const alpha = imageData[index + 3];
          if (alpha < 128) continue;
          const rgb: [number, number, number] = [
            imageData[index],
            imageData[index + 1],
            imageData[index + 2],
          ];

          if (x < size / 2) {
            leftSum = [
              leftSum[0] + rgb[0],
              leftSum[1] + rgb[1],
              leftSum[2] + rgb[2],
            ];
            leftCount += 1;
          } else {
            rightSum = [
              rightSum[0] + rgb[0],
              rightSum[1] + rgb[1],
              rightSum[2] + rgb[2],
            ];
            rightCount += 1;
          }
        }
      }

      const average = (
        sum: [number, number, number],
        count: number,
        fallback: [number, number, number],
      ) =>
        count
          ? ([
              Math.round(sum[0] / count),
              Math.round(sum[1] / count),
              Math.round(sum[2] / count),
            ] as [number, number, number])
          : fallback;

      const primary = average(leftSum, leftCount, [156, 130, 102]);
      const secondary = average(rightSum, rightCount, [139, 115, 85]);
      const light = rgbToCss(adjustColor(primary, 24));
      const dark = rgbToCss(adjustColor(secondary, -32));

      setThemeStyle({
        backgroundImage: `radial-gradient(circle at top, ${light} 0%, ${dark} 75%), linear-gradient(180deg, rgba(156,130,102,0.92), rgba(139,115,85,0.96))`,
        cardBackground: `linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12)), linear-gradient(180deg, ${light} 0%, ${dark} 100%)`,
      });
    };
  }, []);

  const links = [
    {
      title: "40 dias pra ter clareza e direção",
      description: "Pra quem se sente perdida, confusa e sem saber o que fazer",
      image: "./40 dias pra ter clareza e direção.png",
      action: {
        title: "Entrar no grupo",
        url: "https://chat.whatsapp.com/JhNJIxWHK7j4VqOKSH9p2n",
      },
    },
  ];

  const products = [
    {
      title: "Produto Tira-Manchas",
      url: "https://s.shopee.com.br/30j9vOSiHH",
      image: "./products/produto_tira_manchas.webp",
      price: "R$49,90",
    },
    {
      title: "Meia-Calça Peluciada",
      url: "https://s.shopee.com.br/30j9vOSiHH",
      image: "./products/meia_calça.webp",
      price: "R$26,99",
    },
    {
      title: "Lençol Superior Premium",
      url: "https://s.shopee.com.br/30j9vOSiHH",
      image: "./products/lençol_superior_premium.webp",
      price: "R$27,90",
    },
    {
      title: "Lençol King Com Elástico",
      url: "https://s.shopee.com.br/30j9vOSiHH",
      image: "./products/lençol_king_com_elastico.webp",
      price: "R$58,90",
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{ backgroundImage: themeStyle.backgroundImage }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-6 text-center shadow-xl transition-all duration-500"
        style={{
          background: themeStyle.cardBackground,
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <img
          src="./profile_picture.jpg"
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
        />

        <h1 className="text-xl font-semibold text-slate-50 text-shadow-sm">Thais Abrantes</h1>

        <p className="text-slate-100 text-sm mt-1 text-shadow-sm">
          Se você se sente perdida e sem clareza,{" "}
          <strong className="text-white">começa aqui</strong>!
          <br />
          Devocional gratuito (40 dias)
        </p>

        <div className="flex justify-center gap-4 mt-4 text-white">
          <button className="bg-white/10 hover:bg-white/25 rounded-full p-2 cursor-pointer transition-all duration-300 text-white shadow-sm shadow-black/20">
            <IconBrandInstagram size={30} />
          </button>
          <button className="bg-white/10 hover:bg-white/25 rounded-full p-2 cursor-pointer transition-all duration-300 text-white shadow-sm shadow-black/20">
            <IconMail size={30} />
          </button>
          <button className="bg-white/10 hover:bg-white/25 rounded-full p-2 cursor-pointer transition-all duration-300 text-white shadow-sm shadow-black/20">
            <IconMessage size={30} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-5 bg-black/20 rounded-full p-1">
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 ${
              activeTab === "links" ? "bg-white text-black" : "text-white"
            }`}
          >
            Links
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`flex-1 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 ${
              activeTab === "shop" ? "bg-white text-black" : "text-white"
            }`}
          >
            Shop
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-3">
          {activeTab === "links" &&
            links.map((item, index) => (
              <div
                key={index}
                className="w-full rounded-3xl bg-white/10 ring-1 ring-white/10 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.24)]"
              >
                <div className="flex items-center gap-3 p-2 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-white/70 leading-none">
                      {item.description}
                    </p>
                  </div>
                  {item.action && (
                    <a
                      href={item.action.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-sm transition duration-300 hover:bg-white/90"
                      title={item.action.title}
                    >
                      <IconChevronRight size={22} />
                      <span className="sr-only">{item.action.title}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}

          {activeTab === "shop" &&
            products.map((item, index) => (
              <div
                key={index}
                className="w-full rounded-3xl bg-white/10 ring-1 ring-white/10 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.24)] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(item.url, "_blank");
                }}
              >
                <div className="flex items-center gap-3 p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs text-white">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex mr-1 h-11 items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-sm transition duration-300 hover:bg-white/90">
                    Comprar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
