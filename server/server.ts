import { app } from "./index";

const port = process.env.NODE_ENV === 'production'? 3000 : 5000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);