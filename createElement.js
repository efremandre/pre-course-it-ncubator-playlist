export const createElement = (tagName, className) => {
    tagName = document.createElement(`${tagName}`);
    tagName.classList = className;
    return tagName;
}