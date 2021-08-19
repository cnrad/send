// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string,
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    let data = req.body as Data;

    if(data.message.length > 500) return res.status(500).json({ result: 'MESSAGE_TOO_LONG' });
    if(data.name.length > 500) return res.status(500).json({ result: 'NAME_TOO_LONG' });

    axios.post(process.env.WEBHOOK_URL as string, {
        "embeds": [{
            "author": {
                "name": data.name,
                "icon_url": "https://miro.medium.com/max/2000/1*z0kGxAWFi6z1SA-4rFgR2g.png"
            },
            "description": data.message
        }]
    }).then(response => {
        return res.status(200).json({ result: 'Success' })
    })
}
