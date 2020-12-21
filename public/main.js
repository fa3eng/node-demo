console.log('我是main.js');

const getcss = document.querySelector('#getcss');

getcss.onclick = () => {
    // 获取一个新的请求
    const request = new XMLHttpRequest();
    // Initializes a request. 初始化一个请求
    request.open('GET', '/style.css');
    // load是一个事件, 当传输成功的时候就会fired
    request.onload = () => {
        const style = document.createElement('style');
        style.innerHTML = request.response;
        document.head.appendChild(style);
    }
    request.onerror = () => {
        console.log('no');
    }
    // 把请求发回server
    request.send();
}

const get2js = document.querySelector('#get2js');

get2js.onclick = () => {
    // 一个新的请求对象
    const request = new XMLHttpRequest();
    request.open('GET', './2.js');
    request.onload = () => {
        const js = document.createElement('script');
        js.innerHTML = request.response;
        document.body.appendChild(js);
    }
    request.onerror = () => {
        console.log('error');
    }

    request.send();
};

const gethtml = document.querySelector('#gethtml');

gethtml.onclick = () => {
    const request = new XMLHttpRequest();
    // init request
    request.open('GET', '3.html'); // readystate === 1
    // 监听readstate的值是否发生改变
    request.onreadystatechange = () => {
        console.log(`request.readyState是:${request.readyState}`);
        // 状态码为4就是下载完成
        if (request.readyState === 4) {
            // 请求到了正确的页面
            if (request.status >= 200 && request.status < 300) {
                const html = document.createElement('html');
                // request.response 返回响应体内容
                html.innerHTML = request.response;
                document.body.appendChild(html);
            } else {
                alert('加载失败');
            }
        }
    }
    request.send(); // readstate === 2
    // readstate === 3: loading
    // readstate === 4: down
}

const getxml = document.querySelector('#getxml');

getxml.onclick = () => {

    const request = new XMLHttpRequest();
    request.open('GET', '4.xml');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            const dom = request.responseXML;
            console.log(dom);
            const text = dom.getElementsByTagName('warning')[0].textContent;
            console.log(text.trim());
        }
    }
    request.send();
}

const getjson = document.querySelector('#getjson');

getjson.onclick = () => {

    const request = new XMLHttpRequest();
    request.open('GET', '5.json');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            const head1span = document.querySelector('h1>span');
            const json = request.response;
            // 将json转换为js格式
            head1span.innerHTML = JSON.parse(json)["name"];
        }
    }
    request.send();
};

let n = 1;
const getnextpages = document.querySelector('#getnextpages');
getnextpages.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `pages${n}.json`);

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            // 获取一下json中的内容
            const arr = JSON.parse(request.response);
            console.log(arr);
            n = n + 1;

            const ul = document.querySelector('#placeholder');
            arr.forEach(element => {
                // 创建li标签,然后把json里面的值放进去
                let li = document.createElement('li');
                li.textContent = element.id;
                ul.appendChild(li);
            });

        }
    }
    request.send();
}