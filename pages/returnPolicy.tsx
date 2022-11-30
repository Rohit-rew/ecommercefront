import React from "react";
import Head from "next/head";

export default function About() {
  return (
    <div className="p-5 box-border h-full pt-28 min-h-screen bg-gray-200 flex justify-center items-center">
      <Head>
        <title>Return Policy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-5  rounded  shadow max-w-xl bg-white p-5">
        <h1 className="text-5xl  text-center">Return Policy</h1>
        <hr />
        <p className="text-justify ">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </p>
      </div>
    </div>
  );
}