const ChatFrom = (props) => {
  return (
    <div className="text-block">
      <div className="text-from">
        <img className="text-user-dp" src={props.img} alt={props.username} />
        <div className="from-text-inner">
          <p>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatFrom;