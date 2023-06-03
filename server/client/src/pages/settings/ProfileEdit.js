import React, { useState ,useEffect} from "react";
import styled from "styled-components";
import editImg from "../../assets/profileImg.jpg";
import axios from "axios";
import { useNavigate } from "react-router";

const ProfileEdit = () => {
  const [bio, setBio] = useState("");
  const [nick, setNick] = useState("");

  const [biotrue,setBioTrue]=useState(false);
  const [nicktrue,setNickTrue] =useState(false);

  const navigate = useNavigate();

  const viewMyInfo = () => {
    axios
      .get("http://localhost:5000/user/info", {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data:", res.data);
        setBio(res.data.bio);
        setNick(res.data.nickname);
        console.log("myBio:", bio);
        console.log("myNick:", nick);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleNickBio = async () => {
    try {
      await axios.post(
        "http://localhost:5000/setting/nickname",
        { nickname: nick },
        {
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        }
      );
      console.log("myNick:", nick);
      setNickTrue(true);
  
      await axios.post(
        "http://localhost:5000/setting/bio",
        { bio: bio },
        {
          headers: {
            Authorization: `${sessionStorage.getItem("user_token")}`,
          },
        }
      );
      console.log("myBio:", bio);
      setBioTrue(true);
  
      handleNavigation();
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  const handleNavigation = () => {
    if (biotrue && nicktrue) {
      navigate("/profile");
    }
  };

  useEffect(() => {
    console.log("useEffect실행");;
    viewMyInfo();
  }, []);

  useEffect(() => {
    handleNavigation();
  }, [biotrue, nicktrue]);

  return (
    <DescriptContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            color: "white",
            margin: "0 auto",
            marginBottom: "20px",
            marginTop: "30px",
          }}
        >
          <EditText>프로필 이미지</EditText>
          <ProfileImg>
            <img
              src={editImg}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </ProfileImg>
        </div>
        <div>
        <InputFieldWrapper>
            <EditText style={{ color: "white", textAlign: "left" }}>
              닉네임
            </EditText>
            <div style={{ display: "flex" }}>
              <InputField placeholder="닉네임" value={nick} onChange={(e) => setNick(e.target.value)} />
            </div>
          </InputFieldWrapper>
          <InputFieldWrapper>
            <EditText style={{ color: "white", textAlign: "left" }}>
              한 줄 소개
            </EditText>
            <div style={{ display: "flex" }}>
              <InputField placeholder="한줄소개" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </InputFieldWrapper>
        </div>
      </div>
      <ButtonBox onClick={handleNickBio}>저장</ButtonBox>
    </DescriptContainer>
  );
};

export default ProfileEdit;

const ButtonBox = styled.div`
  background-color: #841bc5;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 30px;
  width: 114px;
  height: 46px;

  border-radius: 15px;
`;

const InputFieldWrapper = styled.div`
  /* display: inline-block; */
  margin: 0 30px;
  margin-bottom: 20px;
  /* border: 1px solid yellow; */
`;

const InputField = styled.input`
  height: 50px;
  border: none;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  display: block;
  font-weight: 600;
  /* margin: 0 auto; */
  background: #3c3c3c;
  border-radius: 10px;
  outline: none;
  color: #ffffff;
`;

const DescriptContainer = styled.div`
  /* border: 1px solid pink; */
  top: 130px;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImg = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 70%;
  overflow: hidden;
  margin: 10px;
  /* border: 1px solid red; */
`;

const EditText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`;
