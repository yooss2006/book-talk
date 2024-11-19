import Header from "@/components/header";

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {modal}
    </div>
  );
}
