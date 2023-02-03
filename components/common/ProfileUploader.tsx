import { useState } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";
import Button from "components/common/Button";

export default function ProfileUploader({ id, onImageChanged }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const defaultImageSrc =
    "https://i.ytimg.com/vi/hkq5WZBusC4/maxresdefault.jpg";

  return (
    <Container>
      <img
        className="preview-image"
        alt="preview-image"
        src={
          selectedImage ? URL.createObjectURL(selectedImage) : defaultImageSrc
        }
      />
      <div className="button-group">
        <form>
          <Button size="sm" type="tertiary">
            <label htmlFor={id}>수정</label>
          </Button>
          <input
            type="file"
            id={id}
            name={id}
            accept="image/*"
            onChange={(e) => {
              const target = e.target as any;
              setSelectedImage(target.files[0]);

              if (typeof onImageChanged === "function") {
                onImageChanged(target.files[0]);
              }
            }}
          />
        </form>
        <Button
          size="sm"
          type="secondary"
          label="삭제"
          onClick={() => setSelectedImage(null)}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  .preview-image {
    width: 144px;
    height: 144px;
    border-radius: 50%;
    margin-right: 30px;
    border: 1px solid ${theme.palette.colors.gray[300]};
  }
  form {
    & > input {
      display: none;
    }
    label {
      cursor: pointer;
    }
  }
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
