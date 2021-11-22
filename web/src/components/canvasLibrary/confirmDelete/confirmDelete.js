import checkmark from "../../../assets/checkmark.svg";
import xmark from "../../../assets/xmark.svg";
import "./confirmdelete.css";
const ConfirmDelete = ({ confirmDelete, setShowDeleteModal }) => {
  return (
    <div className="confirm-delete">
      <div className="confirm-delete-text">are you sure you want to delete</div>
      <div className="modal-button-container">
        <img
          className="delete-option-buttons"
          src={checkmark}
          alt="confirm delete"
          onClick={confirmDelete}
        />
        <img
          className="delete-option-buttons"
          src={xmark}
          alt="cancel delete"
          onClick={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
};

export default ConfirmDelete;
