const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const postResponse = require(path.join(__dirname, "postResponse.js"));
const routes = require(path.join(__dirname, "routes.json"));

server.post("/shopping/v1/cartItems", function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3030");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(201).jsonp({
    newDesignListIds: ["DSNAA00000001C"]
  });
});
// 模擬 POST /design-lists resoponse 寫進回傳資料
server.post("/design-lists", function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3030");
  res.header("Access-Control-Allow-Credentials", "true");
  res.jsonp({
    desgnListId: "DSLBC0003450TE",
    statCde: "I",
    deptCde: "605",
    custNam: "Chan",
    custTitle: "1",
    phone: "852 92872281",
    emailAddr: "custSample01@gmail.com",
    regnRefCde: "R3",
    emplNbr: "91234",
    persDesgnList: [
      {
        desgnId: "DSNBC0004257TE",
        tmplId: "TEM00004",
        desgnListId: "DSLBC0003450TE",
        expctDelivDte: "2020-05-13",
        statCde: "I",
        price: 27500,
        modelNbr: "P95090451R",
        suplrId: "C056",
        cntptInd: "N",
        ccyCde: "TWD",
        modelSeqNbr: 502983,
        deptCde: "605",
        persDesgnLineList: [
          {
            desgnId: "DSNBC0004257TE",
            lineNbr: 1,
            tmplCmpntId: "PCS00017",
            tmplCmpntOptId: "49825",
            desgnCmpntOptJson:
              '{\\"styleCatgNbr\\":\\"90451\\", \\"goldType\\":\\"P950\\", \\"texture\\":\\"None\\", \\"finishing\\":\\"Hairline\\", \\"shapeOfShrank\\":\\"Quadrato\\", \\"width\\":\\"4mm\\", \\"ringSize\\":\\"24\\", \\"noOfStone\\":1}',
            statCde: "A",
            modelNbr: "P95090451F----24-040",
            price: 27500,
            ccyCde: "TWD",
            refOptId: "OPT07751"
          }
        ]
      }
    ]
  });
});

server.use(middlewares);
server.use(jsonServer.rewriter(routes));
server.use(postResponse);
server.use(router);
server.listen(8081, () => {
  console.log("JSON Server is running");
});
