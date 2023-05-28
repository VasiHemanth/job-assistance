import Nav from "@/components/Nav";

export default function StoryLayout({ children }) {
  return (
    <section className="flex">
      <div className="w-1/5">
        <Nav />
      </div>
      <div className="w-4/5">{children}</div>
      {/* {children} */}
    </section>
  );
}
