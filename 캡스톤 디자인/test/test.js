const secret_Id = 'nBcrF_omljd_AL2WOV0n'
const secret_Pw = 'QuroIWuHzI'
const local_Id = document.querySelector('#local_name');
const submit_Local = document.querySelector('#local_submit');



function submit() {
    local = local_Id.value;
    console.log(local);


}

submit_Local.addEventListener('click', submit);

const getLocalData = async () => {
    const config = {
        headers: {
            Accept: 'applicataion/json',
            'X-Naver-Client-Id': secret_Id,
            'X-Naver-Client-Secret': secret_Pw,
            display: 5,
            start: 1,
            sort: 'comment'
        }
    }
    const res = await axios.get(`https://openapi.naver.com/v1/search/local.json?query=대전&display=5&start=1&sort=comment`)
    console.log(res.data.title)
}


