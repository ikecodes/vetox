const convertHtmlToPlainText = (html) => {
  if (html) {
    let formattedHtml = html.replaceAll("&lt;", "<")
    formattedHtml = formattedHtml.replaceAll("&gt;", ">")
    var strippedHtml = formattedHtml.replace(/<[^>]+>/g, "")
    return strippedHtml
  }
}

export default convertHtmlToPlainText
