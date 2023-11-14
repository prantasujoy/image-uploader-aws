const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifyJWT = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  console.log({ authorization });

  if (!authorization) {
    res.status(401).send({ message: "unauthorized" });
  } else {
    const token = authorization?.split(" ")[1];

    console.log({ token });

    if (!token) {
      res.sendStatus(401);
    }

    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_POOL_ID,
      tokenUse: "access",
      clientId: process.env.COGNITO_CLIENT_ID,
    });

    try {
      const payload = await verifier.verify(token);
      req.user = {
        id: payload.sub,
        username: payload.username,
        scope: payload.scope,
      };
      next();
    } catch {
      res.status(401).send("Unauthorized");
    }
  }
};

module.exports = verifyJWT;
