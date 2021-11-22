import DisplayCanvas from "./displayCanveses/displayCanvases";
import "./canvasLibrary.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCanvases,
  getUniqueName,
  updateCanvases,
} from "../../store/reducers/canvases";
import { Layer } from "../drawingPage/canvasClass";
import { useNavigate } from "react-router";
import { selectCanvas } from "../../store/reducers/selectedCanvas";
import { updateFilter } from "../../store/reducers/filteredSearch";
import Modal from "../modal/modal";

import ConfirmDelete from "./confirmDelete/confirmDelete";
import pixelIcon from "../../assets/bixels-logo.svg";
import add from "../../assets/add.svg";
import searchIcon from "../../assets/search.svg";
import trashcan from "../../assets/trash.svg";

const CanvasLibrary = () => {
  const canvases = useSelector((state) => state.canvases);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTrash, setSelectedTrash] = useState([]);
  const [trash, setTrash] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  useEffect(() => {
    const updatedCanv = JSON.parse(localStorage.getItem("canvases"));
    dispatch(updateCanvases(updatedCanv));
  }, []);

  const addNewCanvas = () => {
    const basicLayer = new Layer(0);
    const canvas = {
      name: getUniqueName(canvases),
      canvas: [basicLayer],
      drawingLayer: 0,
      color: "#4b4e51",
      tool: "draw",
      opacity: 1,
    };
    canvases.unshift(canvas);
    dispatch(updateCanvases(canvases));
    // localStorage.setItem("canvases", JSON.stringify(canvases));
    // localStorage.setItem("selected-canvas", JSON.stringify(canvas));
    dispatch(selectCanvas(canvas));
    dispatch(updateFilter("", canvases));
    navigate("/draw");
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setTrash(false);
    setSelectedTrash([]);
    dispatch(deleteCanvases(selectedTrash, canvases));
    dispatch(updateFilter(searchTerm, canvases));
  };

  const cancelDelete = () => {
    setSelectedTrash([]);
    setTrash(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(updateFilter(e.target.value, canvases));
  };

  const searchButtonHandler = () => {
    if (!showSearchInput) {
      setSearchTerm("");
      dispatch(updateFilter("", canvases));
    }
    setShowSearchInput((prev) => !prev);
  };

  return (
    <>
      <nav className="navBar-container">
        <div className="leftSide-container">
          {/* <button onClick={() => navigate("/")}> */}
          <img
            className="bixels-icon"
            src={pixelIcon}
            alt="home page"
            onClick={() => navigate("/")}
          />
          {/* </button> */}
        </div>
        <div className="rightSide-container">
          <div className="library-text">library</div>
          <img
            className="library__button"
            src={searchIcon}
            alt="search icon"
            onClick={searchButtonHandler}
          />

          {showSearchInput && (
            <input
              id="searchBarInput"
              placeholder="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          )}

          <img
            className="library__button"
            onClick={addNewCanvas}
            src={add}
            alt="new canvas"
          />

          {!trash && (
            <img
              className="library__button"
              src={trashcan}
              onClick={() => setTrash(true)}
              alt="trash can"
            />
          )}
          {trash && (
            <>
              <button
                disabled={!selectedTrash.length}
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
        </div>
      </nav>
      <div className="display__all__canvases">
        {search.length > 0 ? (
          search.map((canvas, i) => (
            <DisplayCanvas
              key={`canvas-${canvas.name}`}
              canvas={canvas}
              idx={i}
              trash={trash}
              setSelectedTrash={setSelectedTrash}
              selectedTrash={selectedTrash}
            />
          ))
        ) : (
          <div>
            nothing here. create a new canvas by pressing{" "}
            <img src={add} alt="new canvas" />
          </div>
        )}
      </div>
    </>
  );
};

export default CanvasLibrary;
