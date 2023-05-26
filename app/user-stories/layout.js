import Nav from "@/components/Nav";

export default function StoryLayout({ children }) {
  return (
    <section>
      <Nav />
      {children}
    </section>
  );
}
