import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserFollowing() {
  const [userNick, setUserNick] = useState("");

  const [followingList, setFollowingList] = useState([]);

  const viewFollowingList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/who-follow", {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      });
      console.log("res:", res.data);
      setFollowingList(res.data.following);
      console.log(followingList);
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect((e) => {
    viewFollowingList();
  }, []);

  return (
    <div>
      hi<div></div>
    </div>
  );
}
