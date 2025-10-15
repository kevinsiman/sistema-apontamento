"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Setores = () => {
  const searchParams = useSearchParams();
  const { thisItem, thisOp } = useMemo(() => {
    const op = searchParams.get("op");
    const item = searchParams.get("item");
    const OP = searchParams.get("OP");
    const ITEM = searchParams.get("ITEM");

    const thisOp = op ?? OP ?? "";
    const thisItem = item ?? ITEM ?? "";

    return { thisOp, thisItem };
  }, [searchParams]);

  const sectors = ["QUALIDADE", "RECEBIMENTO", "EXPEDICAO", "FATURAMENTO"];
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-10 text-white text-center">
        Outros Setores
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full max-w-2xl">
        {sectors.map((s) => {
          let url: string = "";
          switch (s) {
            case "QUALIDADE":
              url = `https://docs.google.com/forms/d/e/1FAIpQLSeddv7A2M9RJf6clykQmHYHETa45CymogGLn7Jjxw4xKYaOjg/viewform?usp=pp_url&entry.244314100=${thisOp}&entry.1530605116=${thisItem}`;
              break;
            case "RECEBIMENTO":
              url = `https://docs.google.com/forms/d/e/1FAIpQLScOdKDmOUSb3JGn-S4Ws3vVUaJ_uZSYlZRIJzLlH0Fo3TTvUg/viewform?usp=pp_url&entry.643538735=${thisOp}&entry.655519854=${thisItem}`;
              break;
            case "FATURAMENTO":
              url = `https://docs.google.com/forms/d/e/1FAIpQLSf6hlxZ7KpdJnvJBUIKPB3ULakc91TZrZ654AiLtIhNmt07rg/viewform?usp=pp_url&entry.457739417=${thisOp}&entry.2020465440=${thisItem}`;
              break;
            case "EXPEDICAO":
              url = `https://docs.google.com/forms/d/e/1FAIpQLSeOETBL3cZ-bHYRPqBDwUaMTdyD9zHGHAlfs484EN6qhbZi-A/viewform?usp=pp_url&entry.506312802=${thisOp}&entry.1178752615=${thisItem}`;
              break;
            default:
              break;
          }
          return (
            <a
              key={s}
              href={url}
              target="blank"
              className="btn-sector bg-black text-white border-2 border-blue-600 rounded-2xl p-8 text-2xl font-bold uppercase transition-transform transform hover:scale-105 active:scale-95 shadow-md"
            >
              {s}
            </a>
          );
        })}
      </div>
      <div className="flex w-full justify-center items-center">
        <a
          href="/"
          className="mt-6 w-full text-center text-gray-400 hover:text-red-500 underline"
        >
          Voltar para a tela inicial
        </a>
      </div>
    </div>
  );
};

export default Setores;
