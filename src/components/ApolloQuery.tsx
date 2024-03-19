"use client";

import { SearchResult } from "@/app/page";
import { DocumentNode, useQuery } from "@apollo/client";
import { Console } from "console";
import { useRouter } from "next/navigation";


export default function ApolloQuery({data} : {data: SearchResult}) {
  console.log(data);
  const Router = useRouter();
  return (
    <>
      {data?.search.nodes.map((x) => (
        <button
          className="m-2 border-2 border-black w-4/5 text-left text-1xl hover:shadow-sm hover:translate-y-0.5 transform transition"
          onClick={() => Router.push(`/Issue?name=${x.name}&id=${x.id}`)}
          key={x.id}
        >
          <p className="text-2xl">{x.name}</p>
          <p className="text-xl">owner : {x.owner?.login}</p>
          <p>{x.description}</p>
          <p>作成日:{x.createdAt.toString()} 更新日:{x.updatedAt.toString()}</p>
          <p>{x.url}</p>
        </button>
      ))}
    </>
  );
}

