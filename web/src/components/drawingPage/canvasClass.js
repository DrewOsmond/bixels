export class Layer {
  constructor(layerId, layer) {
    this.layer = layer ? Layer.reloadCells(layer.layer) : Layer.addLayer();
    this.active = layer ? layer.active : true;
  }
  static reloadCells(layer) {
    const reloadedCells = [];
    for (let y = 0; y < layer.length; y++) {
      const inner = layer[y];
      const row = [];
      for (let x = 0; x < inner.length; x++) {
        const cell = inner[x];
        row.push(new Cell(16 * x, 16 * y, 16, 16, cell.color, cell.opacity));
      }
      reloadedCells.push(row);
    }

    return reloadedCells;
  }

  static addLayer() {
    const rows = 32;
    const columns = 32;
    const layer = [];
    for (let y = 0; y < rows; y++) {
      const columnCells = [];
      for (let x = 0; x < columns; x++) {
        columnCells.push(new Cell(16 * x, 16 * y, 16, 16));
      }
      layer.push(columnCells);
    }

    return layer;
  }
}

export class Cell {
  constructor(x, y, w, h, color = null, opacity = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.opacity = opacity;
  }

  drawCell(ctx) {
    if (!this.color) return;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

export class Canvas {
  static paintCanvas(canvas, ctx, divCount) {
    for (let layer of canvas.canvas) {
      if (layer.active) {
        Canvas.paintLayer(layer.layer, ctx, divCount);
      }
    }
  }

  static paintLayer(canvasLayer, ctx, divCount) {
    for (let y = 0; y < canvasLayer.length; y++) {
      const inner = canvasLayer[y];
      for (let x = 0; x < inner.length; x++) {
        const cell = inner[x];
        if (!cell.color) continue;
        ctx.save();
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = cell.opacity;
        ctx.fillRect(
          cell.x / divCount,
          cell.y / divCount,
          cell.w / divCount,
          cell.h / divCount
        );
        ctx.restore();
      }
    }
  }

  static clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  static saveDrawing(selectedCanvas) {
    const canvases = JSON.parse(localStorage.getItem("canvases"));

    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      if (canvas.name === selectedCanvas.name) {
        canvases[i] = selectedCanvas;
        localStorage.setItem("canvases", JSON.stringify(canvases));
        localStorage.setItem("selected-canvas", JSON.stringify(selectedCanvas));
      }
    }
  }

  static floodFill(
    layer,
    y,
    x,
    colorToChange,
    color,
    opacity,
    strokes,
    layerId
  ) {
    if (x < 0 || y < 0 || x > 31 || y > 31) return;
    if (!layer[y] || !layer[y][x]) return;
    const cell = layer[y][x];
    if (cell.color === colorToChange && cell.color !== color) {
      const layerOpacity = cell.opacity + opacity;
      cell.color = color;
      cell.opacity = layerOpacity < 1 ? layerOpacity : 1;
      Canvas.floodFill(
        layer,
        y + 1,
        x,
        colorToChange,
        color,
        opacity,
        strokes,
        layerId
      );
      Canvas.floodFill(
        layer,
        y,
        x + 1,
        colorToChange,
        color,
        opacity,
        strokes,
        layerId
      );
      Canvas.floodFill(
        layer,
        y - 1,
        x,
        colorToChange,
        color,
        opacity,
        strokes,
        layerId
      );
      Canvas.floodFill(
        layer,
        y,
        x - 1,
        colorToChange,
        color,
        opacity,
        strokes,
        layerId
      );
    } else {
      return;
    }
  }
}

export class History {
  constructor(strokes) {
    this.strokes = strokes;
    this.next = null;
    this.prev = null;
  }

  addStrokes(state) {
    const strokes = new Strokes(state);
    if (!this.head) {
      this.head = strokes;
    } else if (!this.tail) {
      this.head.next = strokes;
      this.tail = strokes;
      this.tail.prev = this.head;
    } else {
      this.tail.next = strokes;
      strokes.prev = this.tail;
      this.tail = strokes;
    }
  }
}

class Strokes {
  constructor(value) {
    this.strokes = value;
    this.next = null;
    this.prev = null;
  }
}