// const secret_Id = 'nBcrF_omljd_AL2WOV0n'
// const secret_Pw = 'QuroIWuHzI'
// const local_Id = document.querySelector('#local_name');
// const submit_Local = document.querySelector('#local_submit');



// function submit() {
//     local = local_Id.value;
//     console.log(local);
// }

// submit_Local.addEventListener('click', submit);

// const getLocalData = async () => {
//     const config = {
//         headers: {
//             Accept: 'applicataion/json',
//             'X-Naver-Client-Id': secret_Id,
//             'X-Naver-Client-Secret': secret_Pw,
//             display: 5,
//             start: 1,
//             sort: 'comment'
//         }
//     }
//     const res = await axios.get(`https://openapi.naver.com/v1/search/local.json?query=대전&display=5&start=1&sort=comment`)
//     console.log(res.data.title)
// }


// var request = require('request');

// var options = {
//     headers: {
//         "X-Naver-Client-Id": "nBcrF_omljd_AL2WOV0n",
//         "X-Naver-Client-Secret": "QuroIWuHzI"
//     },
//     encoding: "utf-8",
//     method: 'get',
//     url: 'https://openapi.naver.com/v1/search/local.json',
//     qs: {
//         query: "식당",
//         display: 5,
//         start: 1,
//         sort: "random"
//     }
// }

// request(options, function (err, res, html) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("received server data: ");
//     console.log(html);
// });

//----------------------------------------
const form = document.getElementById('location-search-form');
const queryInput = document.getElementById('query');
const resultArea = document.getElementById('result');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();

    if (query) {
        const jsonData = await getNaverLocalAPI(query)
        resultArea.textContent = JSON.stringify(jsonData, null, 2);
    } else {
        alert('검색어를 입력하세요.');
    }
});

async function getNaverLocalAPI(query) {
    const url = 'http://localhost:3000/search';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`서버 에러: ${response.statusText}`);
        }

        const jsonData = await response.json();
        return jsonData;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
