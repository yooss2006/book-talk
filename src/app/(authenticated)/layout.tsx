import ProfileIcon from "@/components/profile-icon";

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <ProfileIcon />
      </header>
      <main>
        {modal}
        {children}
      </main>
    </div>
  );
}
