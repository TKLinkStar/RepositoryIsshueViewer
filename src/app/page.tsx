"use client";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import ApolloQuery from "@/components/ApolloQuery";
import { useRef, useState } from "react";
import Link from "next/link";

// GraphQLの型定義
export type SearchResult = {
  node: any;
  search: {
    pageInfo: {
      startCursor: string
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
    nodes: {
      owner: {login: string}
      name: string
      description: string
      createdAt: Date
      updatedAt: Date
      url: string
      id: string
    }[];
  }
}


export default function Home() {

const[cursorState, setState] = useState<string|null>(null);//カーソル
const[direction, setDirection] = useState<"after"|"before">("after");//ページ方向
const[word, setWord] = useState<string>("a");//検索ワード
const[way, setWay] = useState<"first"|"last">("first");//ページ方向
const mode = useRef<HTMLSelectElement>(null);
const sarchInputBox = useRef<HTMLInputElement>(null);
const query = gql`
query {
  search(type: REPOSITORY, query: "${word} ${mode.current?.value}", ${way}: 10 ${direction}: ${cursorState === null ? null : `"${cursorState}"`} )
  {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ...on Repository {
        owner{login}
        name
        description
        createdAt
        updatedAt
        url
        id
      }
    }
  }
}`
const {data, loading, error, refetch} = useQuery<SearchResult>(query);

function nextButton() {// 次の5件を表示ボタンを押したときの処理
  setDirection("after");//ページ方向を更新
  setWay("first");
  setState(data?.search.pageInfo.endCursor??null);//カーソルを更新
  refetch();//クエリを再実行
  console.log(cursorState);

}

function backButton() {// 前の5件を表示ボタンを押したときの処理
  setDirection("before");//ページ方向を更新
  setWay("last");
  setState(data?.search.pageInfo.startCursor??null);//カーソルを更新
  refetch();//クエリを再実行
  console.log(cursorState);

}

function onSearch() {//検索ボタンを押したときの処理
  console.log(sarchInputBox.current?.value);
  setWord(sarchInputBox.current?.value??"");//検索ワードを更新
  refetch();//クエリを再実行
  console.log(mode.current?.value);
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" >
      <h1 className="text-2xl" >リポジトリビューア</h1>
      <label>
        リポジトリ検索:
        <select ref={mode}>
          <option value="in:name">リポジトリ名</option>
          <option value="in:topics">トピック</option>
          <option value="in:readme">readme</option>

        </select>
        <input ref={sarchInputBox} />
        <button onClick={onSearch}>検索</button>
      </label>
      {data && <ApolloQuery data={data}/>}
      {data?.search.nodes.length==0&&<p>リポジトリが存在しません</p>}
      <div className="flex">
      {data?.search.pageInfo.hasPreviousPage && <button onClick={backButton} className="m-2 border-2 border-black ">前の5件を表示</button>}
      {data?.search.pageInfo.hasNextPage && <button onClick={nextButton} className="m-2 border-2 border-black ">次の5件を表示</button>}
      </div>
    </main>
  );
}
