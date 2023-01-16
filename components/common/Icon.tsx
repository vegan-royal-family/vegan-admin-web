import AddOne from "../../assets/icon/add-one.svg";
import Apple from "../../assets/icon/apple.svg";
import AttentionFilled from "../../assets/icon/attention-filled.svg";
import Attention from "../../assets/icon/attention.svg";
import CheckOne from "../../assets/icon/check_one.svg";
import CheckOneFilled from "../../assets/icon/check-one-filled.svg";
import CircleWhite from "../../assets/icon/circle-white.svg";
import Circle from "../../assets/icon/circle.svg";
import CloseOneFilled from "../../assets/icon/close-one-filled.svg";
import CloseOne from "../../assets/icon/close-one.svg";
import CloseSmall from "../../assets/icon/close-small.svg";
import Remove from "../../assets/icon/delete.svg";
import DoubleLeft from "../../assets/icon/double_left.svg";
import DoubleRight from "../../assets/icon/double_right.svg";
import Down from "../../assets/icon/down.svg";
import Google from "../../assets/icon/google.svg";
import Home from "../../assets/icon/home.svg";
import Kakao from "../../assets/icon/kakao.svg";
import LeftSmall from "../../assets/icon/left_small.svg";
import Left from "../../assets/icon/left.svg";
import Like from "../../assets/icon/like.svg";
import Naver from "../../assets/icon/naver.svg";
import PhoneTelephone from "../../assets/icon/phone_telephone.svg";
import PlayCycle from "../../assets/icon/play_cycle.svg";
import Plus from "../../assets/icon/plus.svg";
import PreviewCloseOne from "../../assets/icon/preview_close_one.svg";
import PreviewClose from "../../assets/icon/preview_close.svg";
import PreviewOpen from "../../assets/icon/preview_open.svg";
import Redo from "../../assets/icon/redo.svg";
import Right from "../../assets/icon/right.svg";
import SettingConfig from "../../assets/icon/setting_config.svg";
import SettingTwo from "../../assets/icon/setting_two.svg";
import StarFilledHalf from "../../assets/icon/star_filled_half.svg";
import StarFilled from "../../assets/icon/star_filled.svg";
import Star from "../../assets/icon/star.svg";
import Up from "../../assets/icon/up.svg";
import Checked from "../../assets/icon/checked.svg";

type IconProps = {
  className?: string;
  icon: string;
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  fill?: string;
};

export default function Icon({
  className,
  icon,
  size = "md",
  fill,
}: IconProps) {
  const SIZES = {
    xxs: 12,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  };

  // TODO: svg 색을 바꾸려면 svg > path > fill을 바꿔줘야함
  const args = {
    className,
    width: SIZES[size],
    height: SIZES[size],
    fill,
  };

  switch (icon) {
    case "add-one":
      return <AddOne {...args} />;
    case "apple":
      return <Apple {...args} />;
    case "attention-filled":
      return <AttentionFilled {...args} />;
    case "attention":
      return <Attention {...args} />;
    case "check-one":
      return <CheckOne {...args} />;
    case "check-one-filled":
      return <CheckOneFilled {...args} />;
    case "circle-white":
      return <CircleWhite {...args} />;
    case "circle":
      return <Circle {...args} />;
    case "close-one-filled":
      return <CloseOneFilled {...args} />;
    case "close-one":
      return <CloseOne {...args} />;
    case "close-small":
      return <CloseSmall {...args} />;
    case "delete":
      return <Remove {...args} />;
    case "double-left":
      return <DoubleLeft {...args} />;
    case "double-right":
      return <DoubleRight {...args} />;
    case "down":
      return <Down {...args} />;
    case "google":
      return <Google {...args} />;
    case "home":
      return <Home {...args} />;
    case "kakao":
      return <Kakao {...args} />;
    case "left-small":
      return <LeftSmall {...args} />;
    case "left":
      return <Left {...args} />;
    case "like":
      return <Like {...args} />;
    case "naver":
      return <Naver {...args} />;
    case "phone-telephone":
      return <PhoneTelephone {...args} />;
    case "play-cycle":
      return <PlayCycle {...args} />;
    case "plus":
      return <Plus {...args} />;
    case "preview-close-one":
      return <PreviewCloseOne {...args} />;
    case "preview-close":
      return <PreviewClose {...args} />;
    case "preview-open":
      return <PreviewOpen {...args} />;
    case "redo":
      return <Redo {...args} />;
    case "right":
      return <Right {...args} />;
    case "setting-config":
      return <SettingConfig {...args} />;
    case "setting-two":
      return <SettingTwo {...args} />;
    case "star-filled-half":
      return <StarFilledHalf {...args} />;
    case "star-filled":
      return <StarFilled {...args} />;
    case "star":
      return <Star {...args} />;
    case "up":
      return <Up {...args} />;
    case "checked":
      return <Checked {...args} />;

    default:
      return;
  }
}
