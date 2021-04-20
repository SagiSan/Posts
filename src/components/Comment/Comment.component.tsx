import * as React from "react";
import "./Comment.styles.css";

interface ICommentProps {
  userName: string;
  text: string;
}

const Comment: React.FunctionComponent<ICommentProps> = ({
  userName,
  text,
}) => {
  return (
    <div className="Comment">
      <span className="username">{userName}</span>
      <p className="text">{text}</p>
    </div>
  );
};

export { Comment };
