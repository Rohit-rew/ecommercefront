import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="bg-gray-800 w-full flex flex-col p-5 gap-5 items-center">

      <Link href={"/about"}>
        <p className="text-gray-400">About</p>
      </Link>

      <Link href={"/shipping"}>
      <p className="text-gray-400">Shippping Policy</p>
      </Link>

      <Link href={"/returnPolicy"}>
        <p className="text-gray-400">Return policy</p>
      </Link>

      <hr className="w-full" />
      <h3 className="text-gray-400 text-center">Made by rohit.codes</h3>
    </div>
  );
}
