/**
 * 网页历史的存储器
 * 需要传入当前APP的Cache对象
 */
(function (window, undefined, $) {

    "use strict";

    /**
     * 初始化场景
     * @param scene_box 场景容器DOM 配置文件定义
     * @param appId 场景ID名称
     * @constructor
     */
    var Scene = function (scene_box, appId) {

        this.scene_box = scene_box;

        this.appId = appId;

    };

    /**
     * 创建APP空场景 scene_box > appId > appId_mast > page
     */
    Scene.prototype.createTo = function () {
        var parent, scene, mask;
        parent = this.scene_box;
        scene = document.createElement("div");
        scene.id = this.appId;
        scene.style.position = "relative";
        mask = document.createElement("div");
        mask.id = this.appId + "_mask";
        scene.appendChild(mask);
        ((parent) ? parent : document.body).appendChild(scene);

    };


    window.Scene = Scene;

}(window, undefined, S));