import style from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

function BackDrop(props) {
  return <div className={style.backdrop} onClick={props.onClickBackDrop}></div>;
}
function OverLay(props) {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
}
const PortalElement = document.getElementById("overlays");
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClickBackDrop={props.onClickModal} />,
        PortalElement
      )}
      {ReactDOM.createPortal(
        <OverLay>{props.children}</OverLay>,
        PortalElement
      )}
    </Fragment>
  );
}
export default Modal;
