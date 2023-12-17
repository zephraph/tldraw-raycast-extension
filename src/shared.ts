export interface CanvasValues {
  id: string;
  description?: string;
}

export interface CanvasDetails {
  name: string;
  description?: string;
}

export const canvasURL = (id: string) => `https://www.tldraw.com/r/aycast_${id}`;
