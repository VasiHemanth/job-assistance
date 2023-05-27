import Nav from "@/components/Nav";

export default function StoryLayout({ children }) {
  return (
    <section className="flex">
      <Nav />
      <div className="my-5">{children}</div>
    </section>
  );
}
