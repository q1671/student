let pyodideEnv;

// 初始化Python环境
async function initPyodide() {
    pyodideEnv = await loadPyodide();
    await pyodideEnv.loadPackage(["pandas", "numpy"]);
}

// 运行代码函数
async function runCode(editId, outId) {
    const codeText = document.getElementById(editId).value;
    const outDom = document.getElementById(outId);
    outDom.innerText = "运行中，请稍等...";

    try {
        pyodideEnv.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        await pyodideEnv.runPythonAsync(codeText);
        const result = pyodideEnv.runPython("sys.stdout.getvalue()");
        outDom.innerText = result || "执行完成，无输出内容";
    } catch (err) {
        outDom.innerText = "运行报错：\n" + err.message;
    }
}

// 页面加载完成初始化
window.onload = initPyodide;