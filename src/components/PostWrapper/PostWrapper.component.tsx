import * as React from "react";
import "./PostWrapper.styles.css";
import { Comment as CleanComment } from "../../components/Comment";
import { Post as CleanPost } from "../../components/Post";
import { IPost, IComment } from "../../types";
import { withWelcomeMessage } from "../../HOC";
import { ToggleComments } from "../ToggleComments";

const Comment = withWelcomeMessage(CleanComment);
const Post = withWelcomeMessage(CleanPost);

interface IPostWrapperProps {
  post: IPost;
  userName: string;
  onPostClick?: () => void;
  type?: string;
  comments: IComment[];
}

const PostWrapper: React.FunctionComponent<IPostWrapperProps> = ({
  post,
  userName,
  type = "view",
  onPostClick,
  comments,
}) => {
  const [showComments, setShowComments] = React.useState(true);

  const onCommentsToggle = (isOn: boolean) => {
    setShowComments(isOn);
  };

  return userName ? (
    <div className={`PostWrapper ${type}`}>
      <div className="post" onClick={type === "list" ? onPostClick : undefined}>
        <Post post={post} userName={userName} type={type} />
      </div>
      <div className="comments">
        {type === "list" ? (
          <ToggleComments onToggle={onCommentsToggle}>
            <ToggleComments.Show>Hide comments</ToggleComments.Show>
            <ToggleComments.Hide>Show comments</ToggleComments.Hide>
            <ToggleComments.Button />
          </ToggleComments>
        ) : null}
        {showComments
          ? comments?.map((comm: IComment) => {
              return (
                <Comment key={comm.id} userName={comm.email} text={comm.body} />
              );
            })
          : null}
      </div>
    </div>
  ) : null;
};

export { PostWrapper };
