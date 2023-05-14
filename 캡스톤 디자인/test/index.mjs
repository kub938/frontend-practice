import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/search', async (req, res) => {
    const query = req.body.query;
    const clientId = 'nBcrF_omljd_AL2WOV0n'; // 네이버 API 클라이언트 ID
    const clientSecret = 'QuroIWuHzI'; // 네이버 API 클라이언트 시크릿
    const url = `https://openapi.naver.com/v1/search/local?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': clientId,
                'X-Naver-Client-Secret': clientSecret,
            },
        });

        if (!response.ok) {
            throw new Error(`네이버 지역 API 요청 실패: ${response.statusText}`);
        }

        const jsonData = await response.json();

        const data = jsonData.items.map((item) => ({
            title: item.title,
            description: item.description,
        }));

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '네이버 지역 API 요청 실패' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
