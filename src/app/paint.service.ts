import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaintService {
  toBlob(canvas): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(blob => resolve(blob));
      } catch (err) {
        reject(err);
      }
    });
  }

  getImage(blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(image.src);
        resolve(image);
      };
      image.onerror = () => reject();
      image.src = URL.createObjectURL(blob);
    });
  }

  * bresenhamLine(x0, y0, x1, y1): Generator<{x: number, y: number}> {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
      yield {x: x0, y: y0};

      if (x0 === x1 && y0 === y1) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }
}
