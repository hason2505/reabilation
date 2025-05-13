# MarkNotes

MarkNotes 是一个笔记引擎，将使用 Markdown 编写的笔记以网页的形式展示。

该项目仅用最纯粹的 Web 三件套（HTML、CSS、JavaScript）构建，用最简单的方式帮你部署一个属于自己的笔记网站。

## 项目架构

``` 
.
├─ core
│  ├─ marked.min.js
│  ├─ press.js
│  └─ toc.js
├─ style
│  └─ style.css
├─ 404.html
├─ index.html
└─ main.md
```

1. core 文件存放项目的所有主要的功能性代码文件
   - `marked.min.js` 是开源项目 marked 的代码文件，用于将 md 文件转换为 HTML ，是该项目的核心引擎
   - `press.js` 是该项目的核心代码，用于主要功能的实现
   - `toc.js` 用于实现目录功能，动态检查网页结构并将其整理成目录
2. `style.css` 文件用于控制页面的样式，通过修改css变量设置页面主题色
3. `index.html` 是页面的入口文件，`main.md` 存放主页内容
4. 当没有索引到文件时就会跳转到 `404.html`


## 文件索引

该项目采用 URL 参数的方式索引文件。格式为`file=文件路径`，`file` 是索引文件的参数名，文件路径是参数值。例如，如果要索引路径为`./file/example.md`文件是就将 URL 写为

``` 
http://marknotes.yoseya.top/?file=file/example.md
```
