import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LogoCabecalho = () => {
  return (
    <Link href="/">
      <div className="container-logo">
        <img
          onClick={() => (window.location.href = "/")}
          src="/static/logo.png"
          className="logo"
          width="70%"
        />
      </div>
    </Link>
  );
};

export default LogoCabecalho;
