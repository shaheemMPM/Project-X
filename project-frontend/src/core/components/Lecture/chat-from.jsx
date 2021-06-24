const ChatFrom = (props) => {
  return (
    <div className="text-block">
      <div className="text-from">
        <button className="text-user-dp">
          <span>{props?.username[0] || ".."}</span>
        </button>
        <div className="from-text-inner">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFrom;
