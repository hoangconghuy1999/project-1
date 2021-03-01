const express = require("express");
const user = require("../services/user");

var router = express.Router();
var userControl = require("../services/user");
const PAGE_SIRE = 1
router.get("/", (req, res) => {
    var page = req.query.page;
    if (page) {
        page = parseInt(page)
        var sotrangboqua = (page - 1) * PAGE_SIRE
        return userControl.getUser()
            .skip(sotrangboqua)
            .limit(PAGE_SIRE)
            .then((data) => {
                res.json({
                    error: false,
                    messenge: "hiển thị toàn bộ dữ liệu thành công",
                    value: data,
                });
            })
            .catch((err) => {
                res.json({
                    error: true,
                    messenge: err,
                })
            })

        // if (page < 1) {
        //     page = 1
        // }
    } else {
        return userControl
            .getUser()
            .then((data) => {
                res.json({
                    error: false,
                    messenge: "hiển thị toàn bộ dữ liệu thành công",
                    value: data,
                });
            })
            .catch((err) => {
                res.json({
                    error: true,
                    messenge: err,
                });
            });
    }
});
router.get("/:id", (req, res) => {
    var id = req.params.id;
    userControl
        .getUser(id)
        .then((data) => {
            if (data) {
                res.json({
                    error: false,
                    messenge: "hiển thị toàn bộ dữ liệu thành công",
                    value: data,
                });
            }
            res.json("khong ton tai id dos");
        })
        .catch((err) => {
            res.json(err);
        });
});
router
    .post("/", (req, res) => {
        var email = req.body.email;
        var password = req.body.password
        var obj = {
            email,
            password,
        }
        userControl.existsSignUp(email)
            .then((data) => {
                if (!data) {
                    return userControl
                        .createUser(obj)
                        .then((data) => {
                            res.json("taoj moi thanh cong");
                        })
                        .catch((err) => {
                            res.json("chuwa tao duoc");
                        });
                }
                res.json({
                    error: true,
                    messenge: "email này đã tồn tại",
                });


            }).catch((err) => {
                res.json({
                    error: true,
                    messenge: err,
                });
            });
    })
router.post("/login", (req, res) => {
    userControl.existsLogin(req.body.email, req.body.password)
        .then((data) => {
            if (data) {
                return res.json({
                    error: false,
                    messenge: "tài khoản này đã tồn tại",
                    value: data
                })
            }
            return res.json({
                error: true,
                messenge: "không tồn tại tài khoản này"
            })
        }).catch((err) => {
            res.json({
                error: true,
                messenge: err
            })
        });
})
router.put("/:id", (req, res) => {
    var body = {};
    var id = req.params.id;
    if (req.body.email) body.email = req.body.email;
    if (req.body.username) body.username = req.body.username;
    if (req.body.password) body.password = req.body.password;
    if (req.body.phone) body.phone = req.body.phone;
    if (req.body.school) body.school = req.body.school;

    userControl
        .existsId(id)
        .then((data) => {
            if (data) {
                return userControl
                    .updateUser(id, Objdata)
                    .then((data) => {
                        res.json("cap nhat thanh cong");
                    })
                    .catch((err) => {
                        res.json("caapj nhaatj thaats baij");
                    });
            }
            res.json("khong co phan tu nay");
        })
        .catch((err) => {
            res.json("khong co phan tu nay");
        });
});

router.delete("/:id", (req, res) => {
    user
        .deleteUser(req.params.id)
        .then((data) => {
            res.json({
                error: false,
                messenge: "xóa thamhf công",
            });
        })
        .catch((err) => {
            res.json({
                error: true,
                messenge: err,
            });
        });
});

module.exports = router;