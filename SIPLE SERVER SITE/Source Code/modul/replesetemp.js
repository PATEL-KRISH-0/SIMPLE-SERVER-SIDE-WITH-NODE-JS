module.exports = (ele, card) => {
    let output = card.replace("{{{src}}}",ele.src);
    output = output.replace("{{{type}}}",ele.Type);
    output = output.replace("{{{description}}}",ele.description);
    output = output.replace("{{{price}}}",ele.price);
    return output;

}