const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Liberar CORS pra todo mundo (necessário pro navegador não bloquear)
app.use(cors());

// Rota principal pra testar se tá online
app.get('/', (req, res) => {
    res.send('Servidor do TikTok Friends Status está online ✅');
});

// Rota para pegar status dos amigos
app.get('/getFriendsStatus', async (req, res) => {
    const sid_tt = req.query.sid_tt;

    if (!sid_tt) {
        return res.status(400).json({ error: 'Parâmetro sid_tt ausente!' });
    }

    try {
        const fetch = await import('node-fetch').then(m => m.default);

        const response = await fetch("https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/im/friend/status/", {
            method: 'GET',
            headers: {
                'user-agent': 'com.ss.android.ugc.trill/150500 (Linux; U; Android 10; en_US; SM-G973N Build/QP1A.190711.020; Cronet/58.0.2991.0)',
                'cookie': `sid_tt=${sid_tt};`,
                'accept': 'application/json'
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados do TikTok.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
