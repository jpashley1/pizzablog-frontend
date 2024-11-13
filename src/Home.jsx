import { PostsIndex } from "./PostsIndex.jsx";

export function Home() {
  const title = "PizzaDream";

  return (
    <div>
      <h1 className="text-6xl text-center p-6 animate-fade-in">
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block animate-bounce-once"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
      <PostsIndex />
    </div>
  );
}
