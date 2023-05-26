import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex w-full pt-3 mb-5">
      <div className="m-3 flex justify-between w-full">
        <Image
          src={"/menu.svg"}
          alt="Menu Icon"
          width={20}
          height={20}
          className="mr-3 md:hidden"
        />
        <p className="font-semibold">Job Assistance</p>

        <div>Profile</div>
      </div>
    </nav>
  );
}
