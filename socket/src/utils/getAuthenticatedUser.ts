interface user {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const getAuthenticatedUser = () => {
  const authUser: user = {
    id: "abc123",
    name: "player Pathak",
    email: "player@email.com",
    image: "http:img/56465439/.jdfj",
  };

  return authUser;
};
