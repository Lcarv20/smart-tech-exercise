import { useEffect, useState } from "react";
import { dataFetch } from "../../functions/requests";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dataFetch("Users").then((res) => {
      setUsers(res);
    });
    dataFetch("Tags").then((res) => {
      setTags(res);
    });
    dataFetch("Posts").then((res) => {
      setPosts(res);
    });
  }, []);
  return (
    <Box display={"flex"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
      <PieChart
        width={600}
        height={400}
        series={[
          {
            data: [
              { id: 0, value: users.length, label: "Users" },
              { id: 1, value: posts.length, label: "Posts" },
              { id: 2, value: tags.length, label: "Tags" },
            ],
          },
        ]}
      />
    </Box>
  );
}
