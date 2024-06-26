let { Router } = require("express");
let controller = require("../controllers/controllers");
let admin_controller = require("../controllers/admin");

let router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

router.get("/profile", controller.profile);
router.get("/user", controller.g_user);
router.put("/userimage", controller.u_userimage);
router.put("/usertagloc", controller.u_usertagloc);

router.post("/post", controller.p_post);
router.get("/post", controller.g_post);
router.put("/post", controller.u_post);
router.delete("/post/:id", controller.d_post);

router.get("/userpost", controller.userpost);
router.get("/post/:id", controller.g_post_id);

router.post("/likepost", controller.p_like);
router.get(`/likepost`, controller.g_like);
router.delete("/likepost", controller.d_like);

router.put("/resetpassword", controller.u_pwd);

// Admin routers

router.get("/get_users", admin_controller.get_users);
router.get("/get_posts", admin_controller.get_posts);

router.put("/update_postStatus/:id/:postStatus", admin_controller.post_status);

router.delete("/del_post/:id", admin_controller.del_post);

router.delete("/del_user/:id", admin_controller.del_user);

module.exports = router;
