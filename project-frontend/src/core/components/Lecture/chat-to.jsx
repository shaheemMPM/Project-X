const ChatTo = (props) => {
  return (
    <div className="text-block">
      <div className="text-to">
        <div className="to-text-inner">
          <p>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatTo;