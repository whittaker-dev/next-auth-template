const getPosts = async () => {
  return {
    posts: [
      { id: 1, title: "test post" },
      { id: 1, title: "test post" },
      { id: 1, title: "test post" },
    ],
  };
};
const page = async () => {
  const { posts } = await getPosts();
  return (
    <div>
      {posts.map((item) => (
        <div className="" key={item.id}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default page;
