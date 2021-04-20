import * as React from "react";
import "./ToggleComments.styles.css";

interface IToggleCommentsProps {
  onToggle: (show: boolean) => void;
}
interface IToggleCommentsContext {
  toggle: () => void;
  show: boolean;
}
interface IStaticComponents {
  Show: any;
  Hide: any;
  Button: any;
}
const CommentsContext = React.createContext<IToggleCommentsContext | null>(
  null
);
const useToggleContext = () => {
  const context = React.useContext(CommentsContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    );
  }
  return context;
};
const ToggleComments: React.FunctionComponent<IToggleCommentsProps> &
  IStaticComponents = ({ onToggle, ...props }) => {
  const [showComments, setShowComments] = React.useState(true);
  const toggle = React.useCallback(() => setShowComments((show) => !show), []);

  const value = React.useMemo(() => ({ show: showComments, toggle }), [
    showComments,
  ]);

  React.useEffect(() => {
    onToggle(showComments);
  }, [showComments]);

  return (
    <div className="ToggleComments">
      <CommentsContext.Provider value={value}>
        {props.children}
      </CommentsContext.Provider>
    </div>
  );
};

const Show = ({ children }: any) => {
  const { show } = useToggleContext();
  return show ? children : null;
};
ToggleComments.Show = Show;

const Hide = ({ children }: any) => {
  const { show } = useToggleContext();
  return show ? null : children;
};
ToggleComments.Hide = Hide;

const Button = () => {
  const { show, toggle } = useToggleContext();
  return (
    <div
      style={{
        fontSize: "0.9rem",
        cursor: "pointer",
        border: "1px solid #bbb",
        borderRadius: "50%",
        padding: "0 5px",
        marginLeft: "10px",
        display: "inline-block",
      }}
      data-testid="toggle-comments"
      onClick={toggle}
    >
      {show ? <span>&#8593;</span> : <span>&#8595;</span>}
    </div>
  );
};
ToggleComments.Button = Button;

export { ToggleComments };
