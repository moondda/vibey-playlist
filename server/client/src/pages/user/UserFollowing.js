import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserFollowing() {
  const [userNick, setUserNick] = useState("");
  const [userImg, setUserImg] = useState("");

  const [followingList, setFollowingList] = useState([]);

  const viewFollowingList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/who-follow", {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      });
      console.log("res:", res.data);
      console.log("res.data.follow:", res.data.following);
      setFollowingList(res.data.following);
      // setUserNick(res.data.following.nickname);
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
      <div style={{ border: "1px solid red" }}>
        {followingList &&
          followingList.map((users, index) => {
            return (
              <div key={index} style={{ border: "1px solid pink" }}>
                <img
                  src={users.profileImage}
                  style={{ width: "100px", border: "1px solid yellow" }}
                />
                <p>{users.nickname}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
