import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import editImg from "../../assets/profileImg.jpg";
import axios from "axios";
import { useNavigate } from "react-router";

const ProfileEdit = (props) => {
  const [bio, setBio] = useState("");
  const [nick, setNick] = useState("");

  const [biotrue, setBioTrue] = useState(false);
  const [nicktrue, setNickTrue] = useState(false);

  const [pfImg, setPfImg] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [localImageURL, setLocalImageURL] = useState(props);

  const navigate = useNavigate();

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
    console.log("useEffect실행");
    viewMyInfo();
  }, []);

  useEffect(() => {
    handleNavigation();
  }, [biotrue, nicktrue]);

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
        setPfImg(res.data.profileImg);
        setLocalImageURL(res.data.profileImg);

        // convertURLtoFile(res.data.profileImg).then((file) => {
        //   setImageFile(file);
        // });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onUploadImage = (e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setLocalImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    console.log("handlesubmit시작");

    let formData = new FormData();

    formData.append("profileImg", imageFile);

    await axios
      .post(`http://localhost:5000/setting/profileImg`, formData, {
        headers: {
          Authorization: `${sessionStorage.getItem("user_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("이미지 업로드 성공");
        console.log("res.data", res.data);
      })
      .catch((err) => {
        alert("이미지 업로드 실패");
        console.log("Error!!!!", err);
        console.log("등록을 실패하였습니다.");
      });

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
            {localImageURL ? (
              <img
                src={localImageURL}
                className="profile_image"
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            ) : (
              <div className="profile_image"></div>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="profileImage"
              onChange={onUploadImage}
            />
            <div style={{ marginTop: "15px" }}></div>
            {/* <form>
              <label htmlFor="profile-upload" />
              <input
                type="file"
                accept="image/*"
                onChnage={onImgChange}
                // style={{ display: "none" }}
              />
            </form> */}
            {/* <input
              ref={logoImgInput}
              type="file"
              accept="image/*"
              onChange={onImgChange}
              style={{ display: "none" }}
            /> */}
            {/* <img
              src={editImg}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            /> */}
          </ProfileImg>
          <br />
          <label
            htmlFor="profileImage"
            style={{
              border: "2px solid gray",
              borderRadius: "20px",
              padding: "2px 7px 2px 7px",
              cursor: "pointer",
            }}
          >
            Change Profile
          </label>
          {/* <button type="submit" onClick={handleSubmit}>
            적용
          </button> */}
        </div>
        <div>
          <InputFieldWrapper>
            <EditText style={{ color: "white", textAlign: "left" }}>
              닉네임
            </EditText>
            <div style={{ display: "flex" }}>
              <InputField
                placeholder="닉네임"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
              />
            </div>
          </InputFieldWrapper>
          <InputFieldWrapper>
            <EditText style={{ color: "white", textAlign: "left" }}>
              한 줄 소개
            </EditText>
            <div style={{ display: "flex" }}>
              <InputField
                placeholder="한줄소개"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </InputFieldWrapper>
        </div>
      </div>
      <ButtonBox
        onClick={(e) => {
          handleSubmit();
        }}
      >
        저장
      </ButtonBox>
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
  border: 1px solid #ffffff;
`;

const EditText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`;
