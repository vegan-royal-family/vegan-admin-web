import React from "react";
import styled from "@emotion/styled";
import { typography } from "styles/typography";
import { useSetRecoilState } from "recoil";
import { authState } from "states/auth";
import { useState } from "react";
import { managerLogin } from "apis/auth";
import Input from "components/common/Input";
import Button from "components/common/Button";

const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  .title {
    padding: 20px;
    ${typography?.heading5}
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

const login = async (id: string, password: string, setAuthState: Function) => {
  try {
    const res = await managerLogin({ id, password });
  } catch (e) {
    console.log(e);
  }
};

export default function ManagerLoginPage() {
  const setAuthState = useSetRecoilState(authState);
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });

  return (
    <LoginPageWrapper>
      <div style={{ height: 100 }}></div>
      <div className="title">관리자 로그인</div>
      <FormContainer>
        <Input
          id="id_field"
          label="아이디"
          value={undefined}
          onChange={undefined}
          width={undefined}
          height={undefined}
          helpText={undefined}
        />
        <Input
          id="pwd_field"
          label="비밀번호"
          value={undefined}
          onChange={undefined}
          width={undefined}
          height={undefined}
          helpText={undefined}
        />
        <Button
          onClick={() =>
            login(loginInfo?.id, loginInfo?.password, setAuthState)
          }
          label={undefined}
          disabled={undefined}
          width={undefined}
        >
          로그인
        </Button>
      </FormContainer>
    </LoginPageWrapper>
  );
}