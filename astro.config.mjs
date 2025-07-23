// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "BUPT 生存手册",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      editLink: {
        baseUrl: "https://github.com/byrdocs/SurviveBUPTManual/edit/main/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/byrdocs/SurviveBUPTManual",
        },
      ],
      sidebar: [
        {
          label: "沙河校区指南",
          items: [
            { label: "新生报到", slug: "shahe-campus/registration" },
            { label: "校区环境", slug: "shahe-campus/campus" },
            { label: "住宿条件", slug: "shahe-campus/dormitory" },
            { label: "学业相关", slug: "shahe-campus/academic" },
            { label: "生活相关", slug: "shahe-campus/life" },
            { label: "网络资源", slug: "shahe-campus/network" },
            { label: "学生组织", slug: "shahe-campus/organization" },
            { label: "其他事项", slug: "shahe-campus/misc" },
          ],
        },
        { label: "搬家攻略", slug: "moving-guide" },
        {
          label: "本部校区指南",
          items: [
            { label: "宿舍条件", slug: "main-campus/dormitory" },
            { label: "生活相关", slug: "main-campus/life" },
            { label: "学习环境", slug: "main-campus/academic" },
            { label: "餐饮指南", slug: "main-campus/dining" },
            { label: "交通出行", slug: "main-campus/transportation" },
            { label: "生活服务", slug: "main-campus/services" },
          ],
        },
        {
          label: "贡献指南",
          slug: "contributing",
        },
        {
          label: "致谢",
          slug: "acknowledgments",
        },
      ],
    }),
  ],
});
