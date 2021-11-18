export class Layer {
  static reloadCells(layer) {
    for (let y = 0; y < layer.length; y++) {
      const inner = layer[y];
      for (let x = 0; x < inner.length; x++) {
        const cell = inner[x];
        inner[x] = new Cell(16 * x, 16 * y, 16, 16, cell.color, cell.opacity);
      }
    }
  }

  static addLayer(canvas) {
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

    canvas.push(layer);
  }
}

export class Cell {
  constructor(x, y, w, h, color = null, opacity = 1) {
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

class History {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addState(state) {}
}

class State {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
