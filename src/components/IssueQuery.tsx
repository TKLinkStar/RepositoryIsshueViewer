"use client";

import { IssueSearchResult } from "@/app/Issue/page";
import { DocumentNode, useQuery } from "@apollo/client";
import { Console } from "console";
import { url } from "inspector";
import { useRouter, useSearchParams } from "next/navigation";


export default function IssueQuery({data} : {data: IssueSearchResult}) {
  console.log(data);
  const Router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
    {data?.node.issues.edges?.map((x,index) => 
    <button className="m-2 border-2 border-black w-4/5 text-left text-1xl hover:shadow-sm hover:translate-y-0.5 transform transition"
    onClick={() => window.location.href = x.node.url}
    key={index}
    >
    <p className="text-2xl">{x.node.title}</p>
    <p className="text-xl">auther : {x.node.author?.login}</p>
    <p>{x.node.state}</p>
    <p>作成日:{x.node.createdAt.toString()}</p>
    <p>{x.node.url}</p>
    </button>
    )}
    </>
  )
}

