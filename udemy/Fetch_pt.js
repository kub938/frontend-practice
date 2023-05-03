const search_ClientId = 'nBcrF_omljd_AL2WOV0n';
const search_Secret = 'QuroIWuHzI';


const input_button = document.querySelector('#search_Button');
const search_Value = document.querySelector("#search_input").value;
const naver_Search = `https://openapi.naver.com/v1/search/local.json?query=${search_Value}&display=5`;


function get_Data() {
    console.log("실행")
    axios.get('https://openapi.naver.com/v1/search/local.json?', {
        params: { query: search_Value },
        headers: {
            'X-Naver-Client-Id': 'nBcrF_omljd_AL2WOV0n',
            'X-Naver-Client-Secret': 'QuroIWuHzI'
        }
    })
        .then((res) => {
            console.log('res', res.data.items);
            // return res.data;
        })
        .catch(error => {
            console.log(error);
        });
}

// function search() {
//     search_Value
// }

input_button.addEventListener('click', get_Data);

// function search() {

// }

// btn_Daejeon.addEventListener('click',)