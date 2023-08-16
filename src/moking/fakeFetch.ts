export function fakeFetch(endpoint: "users" | "posts" | "tags") {
  return fakeData[endpoint];
}

const fakeData = {
  users: [
    {
      id: 5,
      username: "Testor",
      email: "test@test.test",
      posts: [],
    },
    {
      id: 6,
      username: "Blank",
      email: "Blank@test.test",
      posts: [],
    },
    {
      id: 7,
      username: "Gian",
      email: "Gian@test.test",
      posts: [],
    },
    {
      id: 8,
      username: "Sakura",
      email: "Sakura@test",
      posts: [],
    },
  ],
  posts: [
    {
      id: 1,
      title: "string",
      description: "string",
      postedDate: "2023-08-10T16:56:49.840124",
      user: {
        id: 5,
        username: "Testor",
        email: "test@test.test",
        posts: null,
      },
      tagIds: [1],
    },
    {
      id: 2,
      title: "titlon",
      description: "this is kinda repetitive",
      postedDate: "2023-08-10T16:57:10.451452",
      user: {
        id: 6,
        username: "Blank",
        email: "Blank@test.test",
        posts: null,
      },
      tagIds: [2],
    },
  ],
  tags: [
    {
      id: 1,
      name: "taguerili",
      posts: [
        {
          id: 1,
          title: "string",
          description: "string",
          postedDate: "2023-08-10T16:56:49.840124",
          user: null,
          tagIds: [1],
        },
      ],
    },
    {
      id: 2,
      name: "tangerina",
      posts: [
        {
          id: 2,
          title: "titlon",
          description: "this is kinda repetitive",
          postedDate: "2023-08-10T16:57:10.451452",
          user: null,
          tagIds: [2],
        },
      ],
    },
    {
      id: 3,
      name: "hashtag",
      posts: [],
    },
    {
      id: 4,
      name: "hashtag",
      posts: [
        {
          id: 3,
          title: "Tangerines are healthy",
          description: "body here",
          postedDate: "2023-08-10T16:57:38.658951",
          user: null,
          tagIds: [4],
        },
      ],
    },
  ],
};
