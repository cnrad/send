// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string,
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    let data = req.body as Data;

    axios.post(process.env.WEBHOOK_URL as string, {
        "embeds": [{
            "author": {
                "name": data.name,
                "icon_url": "https://miro.medium.com/max/2000/1*z0kGxAWFi6z1SA-4rFgR2g.png"
            },
            "description": data.message
        }]
    }).then(response => {
        return res.status(200).json({ result: 'Message sent successfully' })
    })

    res.status(200).json({ name: 'John Doe' })
}
