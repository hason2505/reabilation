function loadMarkdownFile() {
    document.getElementById("content").style.display = "block";
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFile = urlParams.get("file") || "main.md";

    fetch(selectedFile)
        .then((response) => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then((markdownText) => {
            const htmlContent = marked.parse(markdownText);
            document.getElementById("content").innerHTML = htmlContent;
            generateToc(); //目录
            hljs.highlightAll(); //代码高亮
            //LaTex公式解析
            renderMathInElement(document.body, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "\\(", right: "\\)", display: false },
                ],
            });
        })
        .catch((error) => {
            console.error("Error reading the file:", error);
            window.location.href = "404.html";
        });
}
