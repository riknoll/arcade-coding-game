function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

function drawThickLine(image: Image, x0: number, y0: number, x1: number, y1: number, color: number) {
    // Rounding produces better results when dealing with some angles
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    image.drawLine(x0, y0, x1, y1, color);
    image.drawLine(x0 + 1, y0, x1 + 1, y1, color);
    image.drawLine(x0 - 1, y0, x1 - 1, y1, color);
    image.drawLine(x0, y0 + 1, x1, y1 + 1, color);
    image.drawLine(x0, y0 - 1, x1, y1 - 1, color);
}