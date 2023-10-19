import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'lib/client/config';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      access_token: string;
    };
  }
}

export default withIronSessionApiRoute(function userRoute(req, res) {
  res.send({ user: req.session.user });
}, ironOptions);
