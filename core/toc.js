// 动态生成目录按钮和弹窗
function createTocElements() {
    const tocButton = document.createElement('button');
    tocButton.id = 'toc-button';
    tocButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
    `;
    document.body.appendChild(tocButton);

    // 创建目录弹窗
    const tocModal = document.createElement('div');
    tocModal.id = 'toc-modal';

    const tocContainer = document.createElement('div');
    tocContainer.id = 'toc-container';

    const tocHeader = document.createElement('div');
    tocHeader.id = 'toc-header';

    const tocTitle = document.createElement('h2');
    tocTitle.id = 'toc-title';
    tocTitle.textContent = '目录';

    const closeToc = document.createElement('button');
    closeToc.id = 'close-toc';
    closeToc.innerHTML = '&times;';

    const tocList = document.createElement('ul');
    tocList.id = 'toc';

    // 组装弹窗结构
    tocHeader.appendChild(tocTitle);
    tocHeader.appendChild(closeToc);
    tocContainer.appendChild(tocHeader);
    tocContainer.appendChild(tocList);
    tocModal.appendChild(tocContainer);
    document.body.appendChild(tocModal);
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
    // 动态生成目录按钮和弹窗
    createTocElements();

    // 获取DOM元素
    const tocButton = document.getElementById('toc-button');
    const tocModal = document.getElementById('toc-modal');
    const closeToc = document.getElementById('close-toc');

    // 显示/隐藏弹窗
    tocButton.addEventListener('click', function () {
        tocModal.style.display = 'flex';
    });

    closeToc.addEventListener('click', function () {
        tocModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    tocModal.addEventListener('click', function (e) {
        if (e.target === tocModal) {
            tocModal.style.display = 'none';
        }
    });

    // 页面加载时检查URL哈希
    if (window.location.hash) {
        const id = window.location.hash.substring(1);
        scrollToHeading(id);
    }

    // ESC键关闭弹窗
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            tocModal.style.display = 'none';
        }
    });

    // 生成目录
    generateToc();
});

function generateToc() {
    const toc = document.getElementById('toc');
    const headings = document.querySelectorAll('#content h1, #content h2, #content h3');
    const tocButton = document.getElementById('toc-button');

    // 清空目录列表
    toc.innerHTML = '';

    if (headings.length === 0) {
        // 如果没有标题，隐藏目录按钮
        tocButton.style.display = 'none';
        return;
    } else {
        // 如果有标题，显示目录按钮
        tocButton.style.display = 'block';
    }

    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = generateHeadingId(heading);
        }

        const li = document.createElement('li');
        li.className = `toc-${heading.tagName.toLowerCase()}`;

        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.dataset.target = heading.id;

        a.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToHeading(this.dataset.target);
            document.getElementById('toc-modal').style.display = 'none';
        });

        li.appendChild(a);
        toc.appendChild(li);
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                highlightTocItem(entry.target.id);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50% 0px'
    });

    headings.forEach(heading => {
        observer.observe(heading);
    });
}

function scrollToHeading(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        history.replaceState(null, null, `#${id}`);
        highlightTocItem(id);
    }
}

function highlightTocItem(id) {
    document.querySelectorAll('#toc a').forEach(link => {
        link.classList.remove('active-toc-item');
    });

    const activeLink = document.querySelector(`#toc a[data-target="${id}"]`);
    if (activeLink) {
        activeLink.classList.add('active-toc-item');
    }
}

function generateHeadingId(heading) {
    return heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');
}
