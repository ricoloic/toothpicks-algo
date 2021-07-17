function createV(x, y) {
  return { x, y };
}

class Toothpick {
  constructor(x, y, dir, len = 5) {
    this.newPick = true;
    this.halfLength = len / 2;
    this.direction = dir;
    this.size = len;

    this.center = createV(x, y);

    if (dir > 0) { // vertical
      this.v1 = createV(x - this.halfLength, y);
      this.v2 = createV(x + this.halfLength, y);
    } else { // horizontal
      this.v1 = createV(x, y - this.halfLength);
      this.v2 = createV(x, y + this.halfLength);
    }
  }

  createPicksArr(isEdgeAFree, isEdgeBFree) {
    return [
      isEdgeAFree ? new Toothpick(this.v1.x, this.v1.y, this.direction * -1, this.size) : null,
      isEdgeBFree ? new Toothpick(this.v2.x, this.v2.y, this.direction * -1, this.size) : null,
    ];
  }

  createEdgePicks(toothpicks) {
    let isEdgeAFree = true, isEdgeBFree = true;
    for (let t of toothpicks) {
      if (t != this) {
        if (t.checkEdge(this, 'v1')) isEdgeAFree = false;
        if (t.checkEdge(this, 'v2')) isEdgeBFree = false;
      }
    }
    return this.createPicksArr(isEdgeAFree, isEdgeBFree);
  }

  checkEdge(t, edge) {
    // does intersects
    if (this.v1.x == t[edge].x && this.v1.y == t[edge].y) return true;
    if (this.v2.x == t[edge].x && this.v2.y == t[edge].y) return true;

    // doesn't intersects
    return false;
  }
}