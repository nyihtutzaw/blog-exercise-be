var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/app.ts
var import_cors = __toESM(require("cors"));
var import_express4 = __toESM(require("express"));

// src/routes/index.ts
var import_express3 = require("express");

// src/routes/v1/index.ts
var import_express2 = require("express");

// src/routes/v1/users.ts
var import_express = require("express");
var usersRoutes = (0, import_express.Router)();
usersRoutes.get("/", (req, res) => res.send("hi"));
var users_default = usersRoutes;

// src/routes/v1/index.ts
var routes_v1 = (0, import_express2.Router)();
routes_v1.use("/users", users_default);
var v1_default = routes_v1;

// src/routes/index.ts
var router = (0, import_express3.Router)();
router.get("/health", (req, res) => {
  res.send("Success");
});
router.use("/v1", v1_default);
var routes_default = router;

// src/app.ts
function createServer() {
  return __async(this, null, function* () {
    const app = (0, import_express4.default)();
    app.use((0, import_express4.urlencoded)({ extended: true }));
    app.use((0, import_cors.default)());
    app.use(
      (0, import_cors.default)({
        origin: "*",
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        methods: "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS"
      })
    );
    app.use((0, import_express4.json)());
    app.use("/", routes_default);
    return app;
  });
}

// src/index.ts
var port = process.env.PORT || 8e3;
createServer().then((result) => {
  result.listen(port, () => {
    console.log(`api running on ${port}`);
  });
});
