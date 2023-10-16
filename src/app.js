var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
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
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express5 = __toESM(require("express"));

// src/routes/clients.routes.ts
var import_express = require("express");

// src/interfaces/clients.interfaces.ts
var import_zod = require("zod");
var clientCreateSchema = import_zod.z.object({
  name: import_zod.z.string().max(60, { message: "O nome do cliente \xE9 obrigatorio" }),
  cpf: import_zod.z.string(),
  phone: import_zod.z.string().min(8, { message: "O contato do cliente \xE9 obrigatorio" })
});
var clientResponseSchema = import_zod.z.object({
  id: import_zod.z.union([import_zod.z.number(), import_zod.z.null()]),
  name: import_zod.z.string(),
  cpf: import_zod.z.string(),
  rank: import_zod.z.number().default(3),
  phone: import_zod.z.string(),
  createdAt: import_zod.z.string()
});
var clientUpdateSchema = import_zod.z.object({
  rank: import_zod.z.string().nullable(),
  phone: import_zod.z.string().nullable()
});

// src/data-source.ts
var import_reflect_metadata = require("reflect-metadata");
var import_config = require("dotenv/config");
var import_path = __toESM(require("path"));
var import_typeorm = require("typeorm");
var dataSourceConfig = () => {
  const entitiesPath = import_path.default.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath = import_path.default.join(__dirname, "./migrations/**.{ts,js}");
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Missing env var: 'DATABASE_URL'");
  }
  return {
    type: "postgres",
    url: dbUrl,
    logging: true,
    entities: [entitiesPath],
    // Correção aqui
    migrations: [migrationPath]
  };
};
var AppDataSource = new import_typeorm.DataSource(dataSourceConfig());

// src/entities/clients.ts
var import_reflect_metadata2 = require("reflect-metadata");
var import_typeorm5 = require("typeorm");

// src/entities/contracts.ts
var import_typeorm3 = require("typeorm");

// src/entities/products.ts
var import_typeorm2 = require("typeorm");
var Product = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid")
], Product.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar" })
], Product.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar", default: "https://www.prontaprafesta.com/wp-content/uploads/2018/04/vestido-estilo-princesa-ombro.jpg" })
], Product.prototype, "image", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar" })
], Product.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar" })
], Product.prototype, "modelo", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar" })
], Product.prototype, "color", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "numeric" })
], Product.prototype, "code", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "numeric" })
], Product.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "numeric" })
], Product.prototype, "totalValue", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
], Product.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "numeric", default: 0 })
], Product.prototype, "popularity", 2);
__decorateClass([
  (0, import_typeorm2.ManyToMany)(() => Contract, (contract) => contract.products)
], Product.prototype, "contracts", 2);
Product = __decorateClass([
  (0, import_typeorm2.Entity)()
], Product);

// src/entities/contracts.ts
var Contract = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid")
], Contract.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("int")
], Contract.prototype, "number", 2);
__decorateClass([
  (0, import_typeorm3.Column)("timestamp")
], Contract.prototype, "retirada", 2);
__decorateClass([
  (0, import_typeorm3.Column)("timestamp", { nullable: true })
], Contract.prototype, "devolucao", 2);
__decorateClass([
  (0, import_typeorm3.Column)("varchar")
], Contract.prototype, "observacao", 2);
__decorateClass([
  (0, import_typeorm3.Column)("varchar")
], Contract.prototype, "tipo", 2);
__decorateClass([
  (0, import_typeorm3.Column)("varchar")
], Contract.prototype, "status", 2);
__decorateClass([
  (0, import_typeorm3.Column)("numeric", { default: 0 })
], Contract.prototype, "extra", 2);
__decorateClass([
  (0, import_typeorm3.Column)("numeric")
], Contract.prototype, "total", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
], Contract.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "timestamp" })
], Contract.prototype, "fechado", 2);
__decorateClass([
  (0, import_typeorm3.Column)("numeric")
], Contract.prototype, "pagamento", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => Client, (client) => client.contracts, { nullable: false })
], Contract.prototype, "client", 2);
__decorateClass([
  (0, import_typeorm3.ManyToMany)(() => Product, (product) => product.contracts),
  (0, import_typeorm3.JoinTable)()
], Contract.prototype, "products", 2);
Contract = __decorateClass([
  (0, import_typeorm3.Entity)()
], Contract);

// src/entities/address.ts
var import_typeorm4 = require("typeorm");
var Address = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("uuid")
], Address.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "city", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "street", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "number", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "state", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "zip", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "district", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ length: 50, type: "varchar" })
], Address.prototype, "reference", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Client, (client) => client.address, { nullable: false })
], Address.prototype, "client", 2);
Address = __decorateClass([
  (0, import_typeorm4.Entity)()
], Address);

// src/entities/clients.ts
var Client = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)("uuid")
], Client.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ length: 60, type: "varchar" })
], Client.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ length: 11, unique: true, type: "varchar" })
], Client.prototype, "cpf", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "integer", default: 3 })
], Client.prototype, "rank", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "varchar" })
], Client.prototype, "phone", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
], Client.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Contract, (contract) => contract.client, { cascade: true })
], Client.prototype, "contracts", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Address, (address) => address.client, { cascade: true })
], Client.prototype, "address", 2);
Client = __decorateClass([
  (0, import_typeorm5.Entity)()
], Client);

// src/error/error.ts
var AppError = class extends Error {
  constructor(message, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/services/clients.service.ts
var ClientsServices = class {
  static findAll() {
    return __async(this, null, function* () {
      const clients = yield this.clientRepository.find({
        order: { createdAt: "DESC" },
        relations: ["contracts"]
      });
      return clients;
    });
  }
  static findUnique(id) {
    return __async(this, null, function* () {
      const client = yield this.clientRepository.findOne({
        where: { id },
        relations: ["contracts", "address"]
      });
      if (!client) {
        throw new AppError("Cliente n\xE3o encontrado", 404);
      }
      return client;
    });
  }
  static updateUnique(id, data) {
    return __async(this, null, function* () {
      const client = yield this.clientRepository.findOne({
        where: { id }
      });
      if (!client) {
        throw new AppError("Cliente n\xE3o encontrado", 404);
      }
      client.phone = data.phone || client.phone;
      client.rank = Number(data.rank) || client.rank;
      yield this.clientRepository.save(client);
      return client;
    });
  }
  static create(client) {
    return __async(this, null, function* () {
      const cpf = client.cpf;
      const existingClient = yield this.clientRepository.findOne({
        where: { cpf }
      });
      if (existingClient) {
        throw new AppError("J\xE1 existe um cliente com esse CPF.", 409);
      }
      function removeNonNumericCharacters(str) {
        return str.replace(/\D/g, "");
      }
      client.cpf = removeNonNumericCharacters(client.cpf);
      const newClient = this.clientRepository.create(client);
      yield this.clientRepository.save(newClient);
      return newClient;
    });
  }
  static deleteUnique(id) {
    return __async(this, null, function* () {
      const client = yield this.findUnique(id);
      console.log(id);
      if (!client) {
        throw new AppError("Cliente n\xE3o encontrado", 404);
      }
      yield this.clientRepository.delete(id);
      return;
    });
  }
};
ClientsServices.clientRepository = AppDataSource.getRepository(Client);
var clients_service_default = ClientsServices;

// src/controllers/clients.controllers.ts
var ClientControllers = class {
  static getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const clients = yield clients_service_default.findAll();
        return res.status(200).json(clients);
      } catch (error) {
        return res.status(400).json({ erro: error });
      }
    });
  }
  static findUnique(req, res) {
    return __async(this, null, function* () {
      const clientId = req.params.id;
      try {
        const client = yield clients_service_default.findUnique(clientId);
        return res.status(200).json(client);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({
            error: error.message
          });
        } else {
          return res.status(400).json({ erro: error.message });
        }
      }
    });
  }
  static create(req, res) {
    return __async(this, null, function* () {
      try {
        const client = clientCreateSchema.parse(req.body);
        const newClient = yield clients_service_default.create(client);
        return res.status(201).json(newClient);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static updateUnique(req, res) {
    return __async(this, null, function* () {
      const clientId = req.params.id;
      try {
        const data = clientUpdateSchema.parse(req.body);
        const newClient = yield clients_service_default.updateUnique(clientId, data);
        return res.status(200).json(newClient);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static findUniqueCpf(req, res) {
    return __async(this, null, function* () {
      const userId = req.params.id;
      try {
        yield clients_service_default.deleteUnique(userId);
        return res.status(200).send();
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({
            message: error.message
          });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
};
var clients_controllers_default = ClientControllers;

// src/routes/clients.routes.ts
var clientsRoutes = (0, import_express.Router)();
clientsRoutes.get("/", clients_controllers_default.getAll);
clientsRoutes.get("/:id", clients_controllers_default.findUnique);
clientsRoutes.patch("/:id", clients_controllers_default.updateUnique);
clientsRoutes.post("/", clients_controllers_default.create);
clientsRoutes.delete("/:id", clients_controllers_default.findUniqueCpf);
var clients_routes_default = clientsRoutes;

// src/routes/contracts.routes.ts
var import_express2 = require("express");

// src/interfaces/contracts.interfaces.ts
var import_zod2 = require("zod");
var contractCreateSchema = import_zod2.z.object({
  number: import_zod2.z.number(),
  retirada: import_zod2.z.string().nonempty(),
  devolucao: import_zod2.z.string(),
  observacao: import_zod2.z.string().nullable(),
  tipo: import_zod2.z.string().nullable(),
  fechado: import_zod2.z.string(),
  status: import_zod2.z.string(),
  pagamento: import_zod2.z.number(),
  client: import_zod2.z.object({
    id: import_zod2.z.string()
  }),
  products: import_zod2.z.array(
    import_zod2.z.object({
      id: import_zod2.z.string()
    })
  )
});
var contractResponseSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  number: import_zod2.z.number().min(1, { message: "O numero do contrato \xE9 Obrigatorio" }),
  retirada: import_zod2.z.string().nonempty(),
  devolucao: import_zod2.z.string(),
  observacao: import_zod2.z.string().nullable(),
  tipo: import_zod2.z.string(),
  fechado: import_zod2.z.string(),
  status: import_zod2.z.string(),
  value: import_zod2.z.number(),
  extra: import_zod2.z.number(),
  pagamento: import_zod2.z.number(),
  client: import_zod2.z.object({
    id: import_zod2.z.string()
  }),
  products: import_zod2.z.array(
    import_zod2.z.object({
      id: import_zod2.z.string(),
      name: import_zod2.z.string(),
      price: import_zod2.z.number()
    })
  )
});
var contractUpdateSchema = import_zod2.z.object({
  retirada: import_zod2.z.string(),
  devolucao: import_zod2.z.string(),
  fechado: import_zod2.z.string(),
  observacao: import_zod2.z.string(),
  tipo: import_zod2.z.string(),
  status: import_zod2.z.string(),
  pagamento: import_zod2.z.number(),
  extra: import_zod2.z.number(),
  products: import_zod2.z.array(
    import_zod2.z.object({
      id: import_zod2.z.string()
    })
  )
});

// src/utils/S3Storage.ts
var import_aws_sdk = __toESM(require("aws-sdk"));
var import_path2 = __toESM(require("path"));
var import_mime = __toESM(require("mime"));
var import_fs = __toESM(require("fs"));
var import_config2 = require("dotenv/config");
var S3Storage = class {
  constructor() {
    this.client = new import_aws_sdk.default.S3({
      accessKeyId: process.env.AWS_ACECESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "us-east-2"
    });
  }
  saveFile(fileName) {
    return __async(this, null, function* () {
      const originalPath = import_path2.default.resolve(`src/tmp/${fileName}`);
      const contentType = import_mime.default.getType(originalPath);
      if (!contentType) {
        throw new AppError("Tipo de conte\xFAdo n\xE3o encontrado para o arquivo", 404);
      }
      const fileContent = yield import_fs.default.promises.readFile(originalPath);
      yield this.client.putObject({
        Bucket: `dianealmeida-modelos`,
        Key: fileName,
        Body: fileContent,
        ContentType: contentType,
        ACL: "public-read"
      }).promise();
      yield import_fs.default.promises.unlink(originalPath);
    });
  }
  getFile(fileName) {
    return __async(this, null, function* () {
      const response = yield this.client.getObject({
        Bucket: "dianealmeida-modelos",
        Key: fileName
      }).promise();
      if (response.Body) {
        return response.Body;
      } else {
        throw new AppError("Arquivo n\xE3o encontrado no S3", 404);
      }
    });
  }
};
var S3Storage_default = S3Storage;

// src/services/products.service.ts
var ProductsServices = class {
  static findAll() {
    return __async(this, null, function* () {
      const products = yield this.ProductRepository.find({
        order: { createdAt: "ASC" }
      });
      products.map((product) => this.updatePopularity(product.id));
      const response = yield this.ProductRepository.find({ order: { code: "DESC" } });
      return response;
    });
  }
  static create(product) {
    return __async(this, null, function* () {
      const code = product.code;
      const productExist = yield this.ProductRepository.findOne({
        where: { code }
      });
      if (productExist) {
        throw new AppError("Este Produto ja esta cadastrado", 409);
      }
      const newProduct = this.ProductRepository.create(product);
      yield this.ProductRepository.save(newProduct);
      return newProduct;
    });
  }
  static updatePopularity(productID) {
    return __async(this, null, function* () {
      console.log(`productID: ${productID}`);
      const product = yield this.ProductRepository.findOne({
        where: { id: productID },
        relations: ["contracts"]
      });
      product.popularity = product.contracts.length;
      this.ProductRepository.save(product);
      return;
    });
  }
  static updateUnique(productID, update) {
    return __async(this, null, function* () {
      const product = yield this.ProductRepository.findOne({
        where: { id: productID }
      });
      console.log(update);
      if (!product) {
        throw new AppError("Produto N\xE3o Encontrado", 404);
      }
      product.price = update.price || product.price;
      product.description = update.description || product.description;
      product.modelo = update.modelo || product.modelo;
      product.totalValue = update.price * 3 || product.totalValue;
      yield this.ProductRepository.save(product);
      return product;
    });
  }
  static findUnique(id) {
    return __async(this, null, function* () {
      const product = yield this.ProductRepository.findOne({
        where: { id },
        relations: ["contracts"]
      });
      if (!product) {
        throw new AppError("Produto n\xE3o encontrado", 404);
      }
      return product;
    });
  }
  static deleteUnique(id) {
    return __async(this, null, function* () {
      yield this.ProductRepository.delete(id);
      return;
    });
  }
  static uploadImage(req, res) {
    return __async(this, null, function* () {
      var _a;
      try {
        const product = yield this.ProductRepository.findOne({ where: { id: req.params.id } });
        console.log(product);
        if (!req.file) {
          return res.status(400).json({ error: "Nenhuma imagem enviada" });
        }
        const s3Storage = new S3Storage_default();
        yield s3Storage.saveFile(req.file.filename);
        product.image = (_a = req.file) == null ? void 0 : _a.filename;
        yield this.ProductRepository.save(product);
        res.status(200).json(product);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        res.status(500).json({ error: "Erro ao fazer upload da imagem" });
      }
    });
  }
  static getImage(name) {
    return __async(this, null, function* () {
      try {
        const s3Storage = new S3Storage_default();
        const fileBuffer = yield s3Storage.getFile(name);
        const blob = new Blob([fileBuffer], { type: "application/octet-stream" });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
      } catch (error) {
        console.log(error);
        return null;
      }
    });
  }
};
ProductsServices.ProductRepository = AppDataSource.getRepository(Product);
var products_service_default = ProductsServices;

// src/services/contracts.service.ts
var ContractsService = class {
  static findAll() {
    return __async(this, null, function* () {
      const contracts = yield this.contractRepository.find({
        order: { fechado: "DESC" }
      });
      return contracts;
    });
  }
  static findUnique(id) {
    return __async(this, null, function* () {
      const contract = yield this.contractRepository.findOne({
        where: { id },
        relations: ["client", "products"]
      });
      if (!contract) {
        throw new AppError("Este contrato n\xE3o existe", 404);
      }
      return contract;
    });
  }
  static create(contract) {
    return __async(this, null, function* () {
      const contractNumber = contract.number;
      const existContract = yield this.contractRepository.findOne({
        where: { number: contractNumber }
      });
      if (existContract) {
        throw new AppError("Um contrato com esse n\xFAmero j\xE1 existe!", 409);
      }
      const newContract = this.contractRepository.create(contract);
      newContract.total += contract.extra;
      newContract.products.forEach((product) => __async(this, null, function* () {
        products_service_default.updatePopularity(product.id);
      }));
      if (contract.products && contract.products.length > 0) {
        const products = yield this.ProductRepository.findByIds(contract.products);
        newContract.products = products;
        const total = products.reduce((acc, product) => acc + Number(product.price), 0);
        const descont = total - total * 0.05;
        newContract.total = contract.pagamento === 1 ? descont : total;
      } else {
        newContract.total = 0;
      }
      try {
        yield this.contractRepository.save(newContract);
        return newContract;
      } catch (error) {
        throw new AppError(error.message, 500);
      }
    });
  }
  static updateUnique(id, update) {
    return __async(this, null, function* () {
      console.log(update);
      const contract = yield this.contractRepository.findOne({
        where: { id },
        relations: ["client", "products"]
      });
      if (!contract) {
        throw new AppError("Este contrato n\xE3o existe", 404);
      }
      contract.retirada = update.retirada != "" ? new Date(update.retirada) : contract.retirada;
      contract.devolucao = update.devolucao != "" ? new Date(update.devolucao) : contract.devolucao;
      contract.observacao = update.observacao || contract.observacao;
      contract.tipo = update.tipo || contract.tipo;
      contract.status = update.status || contract.status;
      contract.pagamento = update.pagamento || contract.pagamento;
      contract.extra = update.extra || contract.extra;
      if (update.products && update.products.length > 0) {
        const existingProducts = contract.products || [];
        existingProducts.map((product) => products_service_default.updatePopularity(product.id));
        const newProducts = yield this.ProductRepository.findByIds(update.products);
        contract.products = [...existingProducts, ...newProducts];
      }
      const Newtotal = contract.products.reduce((acc, product) => acc + Number(product.price), 0);
      const total = Newtotal + Number(contract.extra);
      const descont = total - total * 0.05;
      contract.total = contract.pagamento == 1 ? descont : total;
      try {
        yield this.contractRepository.save(contract);
        return contract;
      } catch (error) {
        throw new AppError(error.message, 500);
      }
    });
  }
  static deleteProduct(id, update) {
    return __async(this, null, function* () {
      const contract = yield this.contractRepository.findOne({
        where: { id },
        relations: ["client", "products"]
      });
      if (!contract) {
        throw new AppError("Este contrato n\xE3o existe", 404);
      }
      console.log("o produto a ser removido", update.products);
      if (update.products && update.products.length > 0) {
        const removedProductId = update.products[0].id;
        contract.products = contract.products.filter((product) => product.id !== removedProductId);
        const total = contract.products.reduce((acc, product) => acc + Number(product.price), 0);
        const desconto = total - total * 0.05;
        contract.total = contract.pagamento <= 2 ? desconto : total;
      }
      try {
        yield this.contractRepository.save(contract);
        return contract;
      } catch (error) {
        throw new AppError(error.message, 500);
      }
    });
  }
  static deleteUnique(id) {
    return __async(this, null, function* () {
      try {
        const contract = yield this.contractRepository.findOne({
          where: { id }
        });
        if (!contract) {
          throw new AppError("Este contrato n\xE3o existe", 404);
        }
        yield this.contractRepository.remove(contract);
      } catch (error) {
        console.error("Erro ao excluir contrato:", error);
        throw new AppError("Erro ao excluir contrato", 500);
      }
    });
  }
};
ContractsService.contractRepository = AppDataSource.getRepository(Contract);
ContractsService.clientRepository = AppDataSource.getRepository(Client);
ContractsService.ProductRepository = AppDataSource.getRepository(Product);
var contracts_service_default = ContractsService;

// src/controllers/contracts.controllers.ts
var ContractController = class {
  static getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const contracts = yield contracts_service_default.findAll();
        return res.status(200).json(contracts);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    });
  }
  static findUnique(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      try {
        const contracts = yield contracts_service_default.findUnique(id);
        return res.status(200).json(contracts);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static create(req, res) {
    return __async(this, null, function* () {
      try {
        const contract = contractCreateSchema.parse(req.body);
        const newContract = yield contracts_service_default.create(contract);
        return res.status(200).json(newContract);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error });
        }
      }
    });
  }
  static updateUnique(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      const update = req.body;
      try {
        const contract = yield contracts_service_default.updateUnique(id, update);
        return res.status(200).json(contract);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error });
        }
      }
    });
  }
  static removeProduct(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      const update = req.body;
      try {
        const contract = yield contracts_service_default.deleteProduct(id, update);
        return res.status(200).json(contract);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error });
        }
      }
    });
  }
  static deleteUnique(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      try {
        yield contracts_service_default.deleteUnique(id);
        res.status(200).send();
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error });
        }
      }
    });
  }
};
var contracts_controllers_default = ContractController;

// src/routes/contracts.routes.ts
var contractRoutes = (0, import_express2.Router)();
contractRoutes.get("/", contracts_controllers_default.getAll);
contractRoutes.get("/:id", contracts_controllers_default.findUnique);
contractRoutes.patch("/:id", contracts_controllers_default.updateUnique);
contractRoutes.patch("/remove/:id", contracts_controllers_default.removeProduct);
contractRoutes.post("/", contracts_controllers_default.create);
contractRoutes.delete("/:id", contracts_controllers_default.deleteUnique);
var contracts_routes_default = contractRoutes;

// src/routes/address.routes.ts
var import_express3 = require("express");

// src/interfaces/address.interfaces.ts
var import_zod3 = require("zod");
var addressRequestSchema = import_zod3.z.object({
  city: import_zod3.z.string().max(50),
  street: import_zod3.z.string().max(50),
  number: import_zod3.z.string().max(50),
  state: import_zod3.z.string().max(50),
  zip: import_zod3.z.string().max(50).nullable(),
  district: import_zod3.z.string().max(50),
  reference: import_zod3.z.string().max(50).nullable(),
  client: import_zod3.z.object({
    id: import_zod3.z.string().uuid()
  })
});
var addresResponseSchema = import_zod3.z.object({
  id: import_zod3.z.string().uuid(),
  city: import_zod3.z.string().max(50),
  street: import_zod3.z.string().max(50),
  number: import_zod3.z.string().max(50),
  state: import_zod3.z.string().max(50),
  zip: import_zod3.z.string().max(50),
  district: import_zod3.z.string().max(50),
  reference: import_zod3.z.string().max(50),
  client: import_zod3.z.object({
    id: import_zod3.z.string().uuid()
    // Add any other properties that may exist in the Client entity
  })
});
var addressUpdateSchema = import_zod3.z.object({
  city: import_zod3.z.string().max(50),
  street: import_zod3.z.string().max(50),
  number: import_zod3.z.string().max(50),
  state: import_zod3.z.string().max(50),
  zip: import_zod3.z.string().max(50),
  district: import_zod3.z.string().max(50),
  reference: import_zod3.z.string().max(50)
});

// src/services/address.service.ts
var AddressService = class {
  static findAll() {
    return __async(this, null, function* () {
      const address = yield this.addressRepository.find({
        relations: ["client"]
      });
      return address;
    });
  }
  static updateUnique(id, data) {
    return __async(this, null, function* () {
      const address = yield this.addressRepository.findOne({
        where: { id }
      });
      if (!address) {
        throw new AppError("Address not found", 404);
      }
      address.city = data.city != "" ? data.city : address.city;
      address.street = data.street != "" ? data.street : address.street;
      address.number = data.number != "" ? data.number : address.number;
      address.state = data.state != "" ? data.state : address.state;
      address.zip = data.zip != "" ? data.zip : address.zip;
      address.district = data.district != "" ? data.district : address.district;
      address.reference = data.reference != "" ? data.reference : "";
      yield this.addressRepository.save(address);
      return address;
    });
  }
  static create(address) {
    return __async(this, null, function* () {
      function removeNonNumericCharacters(str) {
        return str.replace(/\D/g, "");
      }
      const newAddress = this.addressRepository.create(address);
      const queryBuilder = this.addressRepository.createQueryBuilder().insert().values(newAddress);
      yield queryBuilder.execute();
      return newAddress;
    });
  }
};
AddressService.addressRepository = AppDataSource.getRepository(Address);
var address_service_default = AddressService;

// src/controllers/address.controllers.ts
var AddressControllers = class {
  static getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const address = yield address_service_default.findAll();
        return res.status(200).json(address);
      } catch (error) {
        return res.status(400).json({ erro: error });
      }
    });
  }
  static updateUnique(req, res) {
    return __async(this, null, function* () {
      try {
        const id = req.params.id;
        const update = addressUpdateSchema.parse(req.body);
        const addres = yield address_service_default.updateUnique(id, update);
        return res.status(200).json(addres);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static create(req, res) {
    return __async(this, null, function* () {
      try {
        const address = addressRequestSchema.parse(req.body);
        const newAddress = yield address_service_default.create(address);
        return res.status(201).json(newAddress);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    });
  }
};
var address_controllers_default = AddressControllers;

// src/routes/address.routes.ts
var addressRoutes = (0, import_express3.Router)();
addressRoutes.get("/", address_controllers_default.getAll);
addressRoutes.patch("/:id", address_controllers_default.updateUnique);
addressRoutes.post("/", address_controllers_default.create);
var address_routes_default = addressRoutes;

// src/routes/products.routes.ts
var import_express4 = require("express");

// src/interfaces/products.interfaces.ts
var import_zod4 = require("zod");
var ProductRequestSchema = import_zod4.z.object({
  name: import_zod4.z.string(),
  description: import_zod4.z.string(),
  modelo: import_zod4.z.string(),
  color: import_zod4.z.string(),
  code: import_zod4.z.number(),
  price: import_zod4.z.number(),
  totalValue: import_zod4.z.number()
});
var ProductResponseSchema = import_zod4.z.object({
  id: import_zod4.z.string(),
  name: import_zod4.z.string(),
  description: import_zod4.z.string(),
  modelo: import_zod4.z.string(),
  color: import_zod4.z.string(),
  code: import_zod4.z.number(),
  price: import_zod4.z.number(),
  totalValue: import_zod4.z.number(),
  contracts: import_zod4.z.array(import_zod4.z.string()),
  image: import_zod4.z.string()
});

// src/controllers/products.controllers.ts
var ProductsControllers = class {
  static getAll(req, res) {
    return __async(this, null, function* () {
      try {
        const products = yield products_service_default.findAll();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    });
  }
  static create(req, res) {
    return __async(this, null, function* () {
      try {
        const product = ProductRequestSchema.parse(req.body);
        const newProduct = yield products_service_default.create(product);
        return res.status(200).json(newProduct);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static findUnique(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      try {
        const product = yield products_service_default.findUnique(id);
        return res.status(200).json(product);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static updateUnique(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      const data = req.body;
      try {
        const product = yield products_service_default.updateUnique(id, data);
        return res.status(200).json(product);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static deleteUnique(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      try {
        yield products_service_default.deleteUnique(id);
        return res.status(200).send();
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  }
  static uploadImage(req, res) {
    return __async(this, null, function* () {
      try {
        const response = yield products_service_default.uploadImage(req, res);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
      }
    });
  }
  static getImage(req, res) {
    return __async(this, null, function* () {
      try {
        const name = req.body.image;
        const image = yield products_service_default.getImage(name);
        return res.status(200).json(image);
      } catch (error) {
        console.log(error);
      }
    });
  }
};
var products_controllers_default = ProductsControllers;

// src/routes/products.routes.ts
var import_multer2 = __toESM(require("multer"));

// src/config/multer.ts
var import_multer = __toESM(require("multer"));
var import_path3 = __toESM(require("path"));
var import_crypto = __toESM(require("crypto"));
var tmpFolder = import_path3.default.resolve(__dirname, "..", "tmp");
console.log(tmpFolder);
var multer_default = {
  directory: tmpFolder,
  storage: import_multer.default.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const filehash = import_crypto.default.randomBytes(10).toString(`hex`);
      const fileName = `${filehash}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
};

// src/routes/products.routes.ts
var productsRoutes = (0, import_express4.Router)();
var upload = (0, import_multer2.default)(multer_default);
productsRoutes.get("/", products_controllers_default.getAll);
productsRoutes.get("/:id", products_controllers_default.findUnique);
productsRoutes.patch("/:id", products_controllers_default.updateUnique);
productsRoutes.post("/", products_controllers_default.create);
productsRoutes.delete("/:id", products_controllers_default.deleteUnique);
productsRoutes.patch("/image/:id", upload.single("file"), products_controllers_default.uploadImage);
productsRoutes.get("/image/find", products_controllers_default.getImage);
var products_routes_default = productsRoutes;

// src/app.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express5.default)();
app.use(import_express5.default.json());
app.use((0, import_cors.default)());
app.use("/clients", clients_routes_default);
app.use("/contracts", contracts_routes_default);
app.use("/address", address_routes_default);
app.use("/products", products_routes_default);
var app_default = app;
