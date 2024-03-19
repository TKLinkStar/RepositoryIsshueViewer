"use client";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import ApolloQuery from "@/components/ApolloQuery";
import { useRef, useState } from "react";
import Link from "next/link";
import IssueQuery from "@/components/IssueQuery";
import { useSearchParams } from "next/navigation";


// GraphQLの型定義
export type IssueSearchResult = {
  node: {
    name: string
    issues: {
      pageInfo: {
        startCursor: string//表示の最初のカーソル
        endCursor: string//表示の最後のカーソル
        hasNextPage: boolean//次のページがあるか
        hasPreviousPage: boolean//前のページがあるか
      }
      edges: {
        node: {
          title: string
          createdAt: Date
          state: string
          author: {
            login: string
          }
          url: string
       }
      }[];
    }  
  }
}


export default function Home() {
const searchParams = useSearchParams();
const[cursorState, setState] = useState<string|null>(null);//カーソル
const[direction, setDirection] = useState<"after"|"before">("after");//ページ方向
const[way, setWay] = useState<"first"|"last">("first");//ページ方向

const query = gql`
{
  node(id: "${searchParams.get("id")}") {
    ... on Repository {
      name
      owner {
        login
      }
      issues(${way}: 10, states: OPEN, ${direction}: ${cursorState === null ? null : `"${cursorState}"`} ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            title
            createdAt
            state
            author {
              login
            }
            url
          }
        }
      }
    }
  }
}
`

const {data, loading, error} = useQuery<IssueSearchResult>(query);
const sarchInputBox = useRef<HTMLInputElement>(null);


function nextButton() {// 次の5件を表示ボタンを押したときの処理
  setDirection("after");//ページ方向を更新
  setWay("first");
  setState(data?.node.issues.pageInfo.endCursor??null);//カーソルを更新
  console.log(cursorState);

}

function backButton() {// 前の5件を表示ボタンを押したときの処理
  setDirection("before");//ページ方向を更新
  setWay("last");
  setState(data?.node.issues.pageInfo.startCursor??null);//カーソルを更新
  console.log(cursorState);
}

  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Issueビューア</h1>
      <p>リポジトリ名 : {searchParams.get("name")}</p>
      {data && <IssueQuery data={data} /> /*データがあれば表示*/}
      {data?.node.issues.edges.length==0&&<p>Issueが存在しません</p>}
      <div className="flex">
        {data?.node.issues.pageInfo.hasPreviousPage && (
          <button onClick={backButton} className="m-2 border-2 border-black">
            前の10件を表示
          </button>
        )}
        {data?.node.issues.pageInfo.hasNextPage && (
          <button onClick={nextButton} className="m-2 border-2 border-black">
            次の10件を表示
          </button>
        )}
      </div>
    </main>
  );
}
