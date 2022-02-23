import { app } from "./index";

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);