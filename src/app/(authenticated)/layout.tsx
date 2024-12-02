import Header from "@/components/header";
import style from "./layout.module.css";

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className={style.page_container}>
      <Header />
      <main className={style.main}>{children}</main>
      {modal}
    </div>
  );
}
