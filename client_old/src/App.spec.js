import Vue from "vue";
import App from "./App.vue";

test("renders without crashing", () => {
    const div = document.createElement("div");
    new Vue({
        render: h => h(App)
    }).$mount(div);
});