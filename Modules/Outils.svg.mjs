// Source.: Infographie et interaction 2023.pptx, Nicolas Chourot
export const svgns = "http://www.w3.org/2000/svg";
export function line(x1, y1, x2, y2, stroke = "black", strokeWidth = 1) {
    let line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);  line.setAttribute("y2", y2);
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", strokeWidth);
    return line;
}
export function rect(x, y, width, height, fill = "white", stroke = "black", strokeWidth = 1) {
    let rect = document.createElementNS(svgns, "rect");
    rect.setAttribute("x", x); rect.setAttribute("y", y);
    rect.setAttribute("width", width); rect.setAttribute("height", height);
    rect.setAttribute("fill", fill); rect.setAttribute("stroke", stroke);
    rect.setAttribute("stroke-width", strokeWidth);
    return rect;
}
export function text(x, y, content, angle = 0, size = "1", fill = "black") {
    let text = document.createElementNS(svgns, "text");
    text.setAttribute("x", x); text.setAttribute("y", y);
    text.setAttribute("transform", `rotate(${angle},${x},${y})`);
    text.setAttribute("font-size", size + "em");
    text.setAttribute("fill", fill);
    text.innerHTML = content;
    return text;
}
    

export function textAlign(viewport, content, textAlign, layoutBox, angle = 0, size = "1", fill = "black"){
    const textItem = text(0, 0, content, 0, size, fill);
    viewport.appendChild(textItem);
    const itemBBox = textItem.getBBox();
    const x = getX(itemBBox, textAlign, layoutBox)
    const y = getY(itemBBox, textAlign, layoutBox)
    textItem.setAttribute("x", x);
    textItem.setAttribute("y", y);
    if(angle != 0) textItem.setAttribute("transform", `rotate(${angle}, ${x + itemBBox.width / 2}, ${y + itemBBox.height / 2})`);
    return textItem;
}

function getX(itemBBox, textAlign, layoutBox){
    const bboxCoefficient = (textAlign % 3) / 2;
    return layoutBox.x + (layoutBox.width - itemBBox.width) * bboxCoefficient;
}

function getY(itemBBox, textAlign, layoutBox){
    const bboxCoefficient = Math.trunc(textAlign / 3) / 2;
    return layoutBox.y + itemBBox.height + (layoutBox.height - itemBBox.height) * bboxCoefficient;
}

export const TextAlign = {
    TOP_LEFT: 0,
    TOP_CENTER: 1,
    TOP_RIGHT: 2,
    MIDDLE_LEFT: 3,
    MIDDLE_CENTER: 4,
    MIDDLE_RIGHT: 5,
    BOTTOM_LEFT: 6,
    BOTTOM_CENTER: 7,
    BOTTOM_RIGHT: 8,
};