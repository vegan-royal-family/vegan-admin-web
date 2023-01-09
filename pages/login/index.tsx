import React, { useState, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { managerLogin } from "apis/auth";
import { authState } from "states/auth";
import Input from "components/common/Input";
import Button from "components/common/Button";
import Toast from "components/common/Toast";

const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  .title {
    padding: 20px;
    ${(p) => p.theme.typography?.heading5}
  }
  #id_field,
  #pwd_field {
    margin-bottom: 16px;
  }
`;

const FormContainer = styled.div`
  min-width: 360px;
  padding: 32px 32px 40px;
  border-radius: 8px;
  border: 1px solid #dadce0;
  & > button {
    display: flex;
    justify-content: center;
    width: 100% !important;
    border-radius: 5px;
  }
`;

export default function ManagerLoginPage() {
  const theme = useTheme();
  const router = useRouter();

  const setAuthProfileState = useSetRecoilState(authState);
  const [loginData, setLoginDataState] = useState<{
    id: string;
    password: string;
  }>({ id: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    name: "id" | "password"
  ) => {
    setLoginDataState((value) => {
      return {
        ...value,
        [name]: e.target.value,
      };
    });
  };

  const loginHandler = async () => {
    try {
      // TODO: id, password 값 검증을 해야할까?
      const res = await managerLogin(loginData);

      //const profileData = res?.data;
      const profileData = {
        id: 1,
        name: "사용자1",
        profileImage: null,
        authorization: null,
      };

      // 사용자 프로필 데이터 저장
      setAuthProfileState(profileData);

      // 메인 페이지로 리다이렉션
      router.replace("/manage");
    } catch (e) {
      // 에러 토스트 표시
      setErrorMessage("로그인에 실패하였습니다.");
      console.log(e);
    }
  };

  return (
    <>
      {errorMessage && (
        <Toast
          type="error"
          title={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}
      <LoginPageWrapper theme={theme}>
        <div style={{ height: 100 }}></div>
        <div className="title">관리자 로그인</div>
        <FormContainer>
          <Input
            id="id_field"
            label="아이디"
            onChange={(e) => inputChangeHandler(e, "id")}
          />
          <Input
            id="pwd_field"
            label="비밀번호"
            onChange={(e) => inputChangeHandler(e, "password")}
          />
          <Button onClick={loginHandler}>로그인</Button>
        </FormContainer>
      </LoginPageWrapper>
    </>
  );
}
