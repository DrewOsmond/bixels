import DisplayCanvas from "./displayCanveses/displayCanvases";
import "./canvasLibrary.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCanvases } from "../../store/reducers/canvases";
import { Layer } from "../drawingPage/canvasClass";
import { useNavigate } from "react-router";
import { selectCanvas } from "../../store/reducers/selectedCanvas";
import Modal from "../modal/modal";
import ConfirmDelete from "./confirmDelete/confirmDelete";

const CanvasLibrary = () => {
  const canvases = useSelector((state) => state.canvases);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTrash, setSelectedTrash] = useState([]);
  const [trash, setTrash] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const localSelected = localStorage.getItem("selected-canvas");
    const selected = localSelected ? JSON.parse(localSelected) : null;
    const localCanvases = localStorage.getItem("canvases");
    const canvases = localCanvases ? JSON.parse(localCanvases) : null;
    if (!selected || !canvases) {
      return;
    } else {
      const name = selected.name;

      for (let canvas of canvases) {
        if (canvas.name === name) {
          canvas.canvas = selected.canvas;
          localStorage.setItem("canvases", JSON.stringify(canvases));
          dispatch(updateCanvases(canvases));
        }
      }
    }
  }, [dispatch]);

  const addNewCanvas = () => {
    const basicLayer = new Layer(0);
    const canvas = {
      name: `untitled project ${canvases.length}`,
      canvas: [basicLayer],
      drawingLayer: 0,
      color: "#4b4e51",
    };
    canvases.unshift(canvas);
    dispatch(updateCanvases(canvases));
    localStorage.setItem("canvases", JSON.stringify(canvases));
    localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    dispatch(selectCanvas(canvas));
    navigate("/draw");
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setTrash(false);
  };

  const cancelDelete = () => {
    setSelectedTrash([]);
    setTrash(false);
  };

  return (
    <>
      <button className="add-new-canvas" onClick={addNewCanvas}>
        add new canvas
      </button>

      {!trash && <button onClick={() => setTrash(true)}>delete</button>}
      {trash && (
        <>
          <button
            onClick={() => setShowDeleteModal(true)}
          >{`delete ${selectedTrash.length} items`}</button>
          <button onClick={cancelDelete}>cancel delete</button>
        </>
      )}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDelete
            confirmDelete={confirmDelete}
            deleteAmount={selectedTrash.length}
          />
        </Modal>
      )}
      <br />
      {canvases?.map((canvas, i) => (
        <DisplayCanvas
          key={`canvas-${i}`}
          canvas={canvas}
          idx={i}
          trash={trash}
          setSelectedTrash={setSelectedTrash}
          selectedTrash={selectedTrash}
        />
      ))}
    </>
  );
};

export default CanvasLibrary;
