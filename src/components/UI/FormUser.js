import React, { useState } from "react";
const FormUser = (props) => {
  const [Go, setGo] = useState("CR7");
  const onSubmitHandler = () => {
    setGo("siiiiiiii");
  };

  return (
    <button onClick={props.onAdds}>
      <form onSubmit={onSubmitHandler}>
        <label>user Name</label>
        <input type="text">{Go}</input>
      </form>
    </button>
  );
};
export default FormUser;
