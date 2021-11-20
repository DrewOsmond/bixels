const ConfirmDelete = ({ confirmDelete, deleteAmount }) => {
  return (
    <>
      <div>{`${deleteAmount} items selected`}</div>
      <div>are you sure you want to delete these canvases?</div>
      <button onClick={confirmDelete}>confirm delete</button>
    </>
  );
};

export default ConfirmDelete;
