"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { signOutUser } from "@/utils/firebase/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const userStories = [
  { title: "title 1" },
  { title: "title 1" },
  { title: "title 1" },
  { title: "title 1" },
  { title: "title 1" },
];

export default function Nav() {
  // const [currentUser, loading] = useAuthContext();

  const router = useRouter();
  const { currentUser, userImage, loading } = useCurrentUser();

  const handleSignOut = () => {
    signOutUser();
    router.push("/");
  };

  return (
    <nav className="flex flex-col w-1/5 h-screen bg-black-shade text-xs">
      <div className="grid grid-rows-[auto,1fr] h-full overflow-hidden">
        <div className="m-3">
          <Image
            src="/menu.svg"
            alt="Menu Icon"
            width={20}
            height={20}
            className="mr-3 md:hidden"
          />
          <button
            className="w-full py-2 border border-gray-400 rounded-[5px] 
            flex justify-center items-center hover:bg-gray-500 focus:outline-none"
          >
            <div className="relative w-4 h-4 mx-2">
              <Image
                src="/add.svg"
                alt="add Icon"
                fill={true}
                className="mr-3"
              />
            </div>
            New Story
          </button>
          <p className="p-2">User Stories</p>
        </div>
        <div className="overflow-hidden hover:overflow-auto">
          {userStories.map((story, index) => (
            <div key={index} className="my-4 p-2 flex">
              <div className="relative w-4 h-4 mx-2">
                <Image
                  src="/chat.svg"
                  alt="add Icon"
                  fill={true}
                  className="mr-3"
                />
              </div>
              {story.title}
            </div>
          ))}
        </div>
        <div className="row-span-1 border-t border-gray-400 overflow-hidden mb-15 ">
          {/* <p className="font-semibold">Job Assistance</p> */}
          <div className="flex items-center bottom-auto my-1 p-3">
            <div className="relative w-6 h-6">
              <Image
                src={userImage ? userImage : "/profile.svg"}
                alt="add Icon"
                fill={true}
              />
            </div>
            <p className="pl-2">{currentUser}</p>
          </div>
          <div
            className="flex items-center p-3 hover:bg-gray-400 cursor-pointer"
            onClick={handleSignOut}
          >
            <div className="relative w-6 h-5">
              <Image
                src="/logout.svg"
                alt="add Icon"
                fill={true}
                className="mr-3"
              />
            </div>
            <p className="pl-2">Log out</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
