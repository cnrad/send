import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string,
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    let data = req.body as Data;

    if(data.message.length > 1000) return res.status(500).json({ result: 'MESSAGE_TOO_LONG' });
    if(data.name.length > 30) return res.status(500).json({ result: 'NAME_TOO_LONG' });

    axios.post(process.env.WEBHOOK_URL as string, {
        "embeds": [{
            "author": {
                "name": data.name
            },
            "description": data.message
        }]
    }).then(response => {
        return res.status(200).json({ result: 'Success' })
    })

    return res.status(500).json({ result: 'DISCORD_API_ERROR' });
}
