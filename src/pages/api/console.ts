import { NextApiHandler } from 'next';

const handle: NextApiHandler = (_req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.send(404);
    return;
  }
  if (_req.method === 'POST') {
    console.log(_req.body.data);
    res.send(200);
  }
};

export default handle;
